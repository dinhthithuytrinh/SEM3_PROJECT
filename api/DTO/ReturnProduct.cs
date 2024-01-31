using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Entities;
using Microsoft.EntityFrameworkCore;

namespace api.DTO
{
  public class ReturnProduct
  {
    public int Id { get; set; }
    public int ProductCode { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }

    [Precision(38, 2)]
    public decimal Price { get; set; }
    public string PictureUrl { get; set; }

    public string ProductType { get; set; }
    public int ProductTypeId { get; set; }


    public string ProductBrand { get; set; }
    public int ProductBrandId { get; set; }

    public int Quantity { get; set; }
    public Boolean Status { get; set; }
    public DateTime CreatedBy { get; set; } = DateTime.Now;
    public DateTime UpdateBy { get; set; } = DateTime.Now;
  }
}