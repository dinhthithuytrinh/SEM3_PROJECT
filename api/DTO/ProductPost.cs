using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace api.DTO
{
  public class ProductPost
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }

    [Precision(38, 2)]
    public decimal Price { get; set; }

    public string PictureUrl { get; set; }
    public IFormFile Picture { get; set; }

    public string ProductType { get; set; }
    public string ProductBrand { get; set; }
    public int Quantity { get; set; }
    public bool Status { get; set; }
  }
}