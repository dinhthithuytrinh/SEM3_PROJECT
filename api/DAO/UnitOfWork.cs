using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Entities;
using api.Entities.OrderAggregate;

namespace api.DAO
{
  public class UnitOfWork : IUnitOfWork
  {
    private readonly ApplicationDbContext _db;
    private GenericRepository<Product> _productRepository;
    private GenericRepository<ProductBrand> _productBrandRepository;
    private GenericRepository<ProductType> _productTypeRepository;
    private GenericRepository<Order> _orderRepository;
    private GenericRepository<DeliveryMethod> _deliveryMethodRepository;

    public UnitOfWork(ApplicationDbContext dbContext)
    {
      _db = dbContext;
    }

    public int Save()
    {
      return _db.SaveChanges();
    }


    public void Dispose()
    {
      _db.Dispose();
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

    public GenericRepository<Order> OrderRepository
    {
      get
      {
        if (this._orderRepository == null)
        {
          this._orderRepository = new GenericRepository<Order>(_db);
        }
        return _orderRepository;
      }
    }

    public GenericRepository<DeliveryMethod> DeliveryMethodRepository
    {
      get
      {
        if (this._deliveryMethodRepository == null)
        {
          this._deliveryMethodRepository = new GenericRepository<DeliveryMethod>(_db);
        }
        return _deliveryMethodRepository;
      }
    }


  }
}