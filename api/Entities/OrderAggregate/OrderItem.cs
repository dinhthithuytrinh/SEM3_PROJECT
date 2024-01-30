using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace api.Entities.OrderAggregate
{
  public class OrderItem : BaseEntity
  {
    public int ProductItemId { get; set; }
    public string ProductName { get; set; }
    public string PictureUrl { get; set; }

    [Precision(38, 2)]
    public decimal Price { get; set; }
    public int Quantity { get; set; }

    public OrderItem() { }

    public OrderItem(int productItemId, string productName, string pictureUrl, decimal price, int quantity)
    {
      ProductItemId = productItemId;
      ProductName = productName;
      PictureUrl = pictureUrl;
      Price = price;
      Quantity = quantity;
    }
  }
}