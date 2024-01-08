using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace api.Entities
{
    public class FileUpLoadAPI
    {

        public int ProductId { get; set; }
        public int ProductCode { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        [Precision(38, 2)]
        public decimal Price { get; set; }
      
        public int ProductTypeId { get; set; }

        public int ProductBrandId { get; set; }

        public int Quantity { get; set; }

        public Boolean Status { get; set; }
        public DateTime CreatedBy { get; set; } = DateTime.Now;
        public DateTime UpdateBy { get; set; } = DateTime.Now;
        [NotMapped]
        public IFormFile files { get; set; }
    }


}