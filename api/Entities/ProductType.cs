using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Entities
{
  public class ProductType
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string PictureUrl { get; set; }
    public Boolean Status { get; set; }
    public DateTime CreatedBy { get; set; } = DateTime.Now;
    public DateTime UpdateBy { get; set; } = DateTime.Now;
  }
}