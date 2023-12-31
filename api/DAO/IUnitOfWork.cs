using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Entities;

namespace api.DAO
{
  public interface IUnitOfWork : IDisposable
  {
    void Save();

    GenericRepository<Product> ProductRepository { get; }
    GenericRepository<ProductBrand> ProductBrandRepository { get; }
    GenericRepository<ProductType> ProductTypeRepository { get; }
  }
}