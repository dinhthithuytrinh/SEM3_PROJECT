using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductsController : ControllerBase
    {
        [HttpGet]
        public string GetProducts() {
            return "list of products";
        }

        [HttpGet("{id}")]
        public string GetDetailProduct() {
            return "product";
        }
    }
}