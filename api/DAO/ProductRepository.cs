using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Entities;
using Microsoft.EntityFrameworkCore;

namespace api.DAO
{
  public class ProductRepository : IProductRepository
  {
    private readonly ApplicationDbContext _context;
    public ProductRepository(ApplicationDbContext context)
    {
      _context = context;
    }
    public async Task<Product> GetProductById(int id)
    {
      return await _context.Products
      .Include(p => p.ProductType)
      .Include(p => p.ProductBrand)
      .FirstOrDefaultAsync(p => p.ProductCode == id);
    }

    public async Task<List<Product>> GetProducts()
    {
      return await _context.Products
          .Include(p => p.ProductType)
          .Include(p => p.ProductBrand)
          .ToListAsync();
    }
  }
}