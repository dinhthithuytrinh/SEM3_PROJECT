using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Entities.OrderAggregate;
using Microsoft.EntityFrameworkCore;

namespace api.DTO
{
  public class ReturnOrderDto
  {
    public int Id { get; set; }
    public List<ReturnOrderItemDto> OrderItems { get; set; }
    public string BuyerEmail { get; set; }
    public DateTimeOffset OrderDate { get; set; }
    public Address ShipToAddress { get; set; }
    public string DeliveryMethod { get; set; }
    [Precision(38, 2)]
    public decimal ShippingPrice { get; set; }
    [Precision(38, 2)]
    public decimal Subtotal { get; set; }
    [Precision(38, 2)]
    public decimal Total { get; set; }
    public string Status { get; set; }
  }
}