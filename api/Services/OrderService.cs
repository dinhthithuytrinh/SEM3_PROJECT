using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DAO;
using api.Entities;
using api.Entities.OrderAggregate;
using Microsoft.EntityFrameworkCore;

namespace api.Services
{
  public class OrderService : IOrderService
  {
    private readonly IUnitOfWork _unitOfWork;
    private readonly IBasketRepository _basketRepository;

    public OrderService(IUnitOfWork unitOfWork,
                        IBasketRepository basketRepository)
    {
      _unitOfWork = unitOfWork;
      _basketRepository = basketRepository;
    }
    public async Task<Order> CreateOrderAsync(string buyerEmail, int deliveryMethodId, string basketId, Address shippingAddress)
    {
      CustomerBasket basket = await _basketRepository.GetBasketAsync(basketId);

      List<OrderItem> items = new List<OrderItem>();
      foreach (var item in basket.Items)
      {
        Product productItem = await _unitOfWork.ProductRepository.GetEntityById(item.Id);
        OrderItem orderItem = new OrderItem(productItem.Id, productItem.Name, productItem.PictureUrl, productItem.Price, item.Quantity);
        items.Add(orderItem);
      }

      DeliveryMethod deliveryMethod = await _unitOfWork.DeliveryMethodRepository.GetEntityById(deliveryMethodId);
      decimal subtotal = items.Sum(item => item.Price * item.Quantity);

      var order = new Order(items, buyerEmail, shippingAddress, deliveryMethod, subtotal);
      _unitOfWork.OrderRepository.Add(order);

      var updatedRecord = _unitOfWork.Save();

      if (updatedRecord <= 0)
        return null;

      await _basketRepository.DeleteBasketAsync(basketId);

      return order;
    }

    public async Task<List<DeliveryMethod>> GetDeliveryMethodsAsync()
    {
      return await _unitOfWork.DeliveryMethodRepository.GetAll();
    }

    public async Task<Order> GetOrderByIdAsync(int id, string buyerEmail)
    {
      var query = _unitOfWork.OrderRepository.QueryWithConditions(
          filter: x => x.BuyerEmail == buyerEmail && x.Id == id,
          orderBy: null,
          includeProperties: "OrderItems,DeliveryMethod"
      );
      return await query.FirstOrDefaultAsync();
    }
    public async Task<List<Order>> GetOrdersForUserAsync(string buyerEmail)
    {
      var orders = await _unitOfWork.OrderRepository.GetEntities(
          filter: x => x.BuyerEmail == buyerEmail,
          orderBy: notYetSorted => notYetSorted.OrderByDescending(x => x.OrderDate),
          includeProperties: "OrderItems,DeliveryMethod"
      );
      return orders.ToList();
    }
  }
}