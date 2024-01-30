using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Entities.Identity;
using Microsoft.EntityFrameworkCore;

namespace api.Entities.OrderAggregate
{
  public class Order : BaseEntity
  {
    public List<OrderItem> OrderItems { get; set; }
    public string BuyerEmail { get; set; }
    public DateTimeOffset OrderDate { get; set; } = DateTimeOffset.Now;
    public Address ShipToAddress { get; set; }
    public DeliveryMethod DeliveryMethod { get; set; }

    [Precision(38, 2)]
    public decimal Subtotal { get; set; }
    public OrderStatus Status { get; set; } = OrderStatus.Pending;
    public string PaymentIntentId { get; set; }

    public decimal GetTotal()
    {
      return Subtotal + DeliveryMethod.Price;
    }

    public Order() { }

    public Order(List<OrderItem> orderItems, string buyerEmail, Address shipToAddress, DeliveryMethod deliveryMethod, decimal subtotal)
    {
      OrderItems = orderItems;
      BuyerEmail = buyerEmail;
      ShipToAddress = shipToAddress;
      DeliveryMethod = deliveryMethod;
      Subtotal = subtotal;
    }
  }
}