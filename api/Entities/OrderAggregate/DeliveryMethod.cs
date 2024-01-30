using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace api.Entities.OrderAggregate
{
  public class DeliveryMethod : BaseEntity
  {
    public string ShortName { get; set; }
    public string DeliveryTime { get; set; }
    public string Description { get; set; }

    [Precision(38, 2)]
    public decimal Price { get; set; }

  }
}