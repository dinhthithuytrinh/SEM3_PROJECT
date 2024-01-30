using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Entities;
using api.Entities.OrderAggregate;

namespace api.DAO
{
  public interface IUnitOfWork : IDisposable
  {
    int Save();

    GenericRepository<Product> ProductRepository { get; }
    GenericRepository<ProductBrand> ProductBrandRepository { get; }
    GenericRepository<ProductType> ProductTypeRepository { get; }
    GenericRepository<Order> OrderRepository { get; }
    GenericRepository<DeliveryMethod> DeliveryMethodRepository { get; }
  }
}