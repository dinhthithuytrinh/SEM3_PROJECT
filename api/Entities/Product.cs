using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace api.Entities
{
  public class Product
  {
    public int Id { get; set; }
    public int ProductCode { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }

    [Precision(38, 2)]
    public decimal Price { get; set; }
    public string PictureUrl { get; set; }

    public ProductType ProductType { get; set; }
    public int? ProductTypeId { get; set; }


    public ProductBrand ProductBrand { get; set; }
    public int? ProductBrandId { get; set; }

    [NotMapped]
    public IFormFile files { get; set; }

    public int? Quantity { get; set; }
    public bool? Status { get; set; }
    public DateTime CreatedBy { get; set; } = DateTime.Now;
    public DateTime UpdateBy { get; set; } = DateTime.Now;
  }
}
