using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Entities;

namespace api.DAO
{
  public class UnitOfWork : IUnitOfWork
  {
    private readonly ApplicationDbContext _db;
    private GenericRepository<Product> _productRepository;
    private GenericRepository<ProductType> _productTypeRepository;
    private GenericRepository<ProductBrand> _productBrandRepository;

    public UnitOfWork(ApplicationDbContext db)
    {
      _db = db;
    }

    public void Dispose()
    {
      _db.Dispose();
    }

    public void Save()
    {
      _db.SaveChanges();
    }

    public GenericRepository<Product> ProductRepository
    {
      get
      {
        if (this._productRepository == null)
        {
          this._productRepository = new GenericRepository<Product>(_db);
        }
        return _productRepository;
      }
    }

    public GenericRepository<ProductBrand> ProductBrandRepository
    {
      get
      {
        if (this._productBrandRepository == null)
        {
          this._productBrandRepository = new GenericRepository<ProductBrand>(_db);
        }
        return _productBrandRepository;
      }
    }

    public GenericRepository<ProductType> ProductTypeRepository
    {
      get
      {
        if (this._productTypeRepository == null)
        {
          this._productTypeRepository = new GenericRepository<ProductType>(_db);
        }
        return _productTypeRepository;
      }
    }

  }
}