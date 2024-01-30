using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace api.DTO
{
  public class ReturnOrderItemDto
  {
    public int ProductItemId { get; set; }
    public string ProductName { get; set; }
    public string PictureUrl { get; set; }

    [Precision(38, 2)]
    public decimal Price { get; set; }
    public int Quantity { get; set; }
  }
}