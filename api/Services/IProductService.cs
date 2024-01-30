using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTO;
using api.Entities;

namespace api.Services
{
    public interface IProductService
    {
        Task<int> addOrUpdateProduct(ProductPost input); /// return id of new product
        Task deleteProduct(int productId);
    }
}