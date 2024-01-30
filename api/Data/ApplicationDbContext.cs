using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Entities;
using api.Entities.Identity;
using api.Entities.OrderAggregate;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
  public class ApplicationDbContext : IdentityDbContext<AppUser>
  {
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }
    public DbSet<Product> Products { get; set; }
    public DbSet<ProductType> ProductTypes { get; set; }
    public DbSet<ProductBrand> ProductBrands { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderItem> OrderItems { get; set; }
    public DbSet<DeliveryMethod> DeliveryMethods { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
      base.OnModelCreating(builder);
      builder.Entity<Order>().OwnsOne(o => o.ShipToAddress, a => a.WithOwner());
      builder.Entity<Order>().HasMany(o => o.OrderItems).WithOne().OnDelete(DeleteBehavior.Cascade);
      builder.Entity<Order>()
          .Property(s => s.Status)
          .HasConversion(
              o => o.ToString(),
              o => (OrderStatus)Enum.Parse(typeof(OrderStatus), o)
          );
    }
  }
}