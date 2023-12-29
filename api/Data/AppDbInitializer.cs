using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Entities;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class AppDbInitializer
    {
        public static void Seed(IApplicationBuilder applicationBuilder) {
            using (var serviceScope = applicationBuilder.ApplicationServices.CreateScope()) {
                var context = serviceScope.ServiceProvider.GetService<ApplicationDbContext>();

                if (context != null) {
                    context.Database.Migrate();

                    if (!context.Products.Any()) {
                        context.Products.AddRange(new List<Product>() {
                            new Product() {
                                Name = "Product one"
                            },
                            new Product() {
                                Name = "Product two"
                            },
                            new Product() {
                                Name = "Product three"
                            }
                        });
                        context.SaveChanges();
                    }
                } 
            }
        }
    }
}