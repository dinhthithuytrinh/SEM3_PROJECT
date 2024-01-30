using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTO
{
  public class OrderDto
  {
    public string BasketId { get; set; }
    public int DeliveryMethodId { get; set; }
    public ReturnAddress ShipToAddress { get; set; }
  }
}