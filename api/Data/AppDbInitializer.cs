using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Entities;
using api.Entities.Identity;
using api.Entities.OrderAggregate;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
	public class AppDbInitializer
	{
		public static async Task Seed(IApplicationBuilder applicationBuilder)
		{
			using (var serviceScope = applicationBuilder.ApplicationServices.CreateScope())
			{
				var context = serviceScope.ServiceProvider.GetService<ApplicationDbContext>();

				if (context != null)
				{
					context.Database.Migrate();
					if (!context.ProductTypes.Any())
					{
						context.ProductTypes.AddRange(
								new List<ProductType>()
								{
																new ProductType()
																{
																		Name = "Arts",
																		Description = "Arts for everybody",
																		PictureUrl = "images/types/art.jpg",
																		Status = true
																},
																new ProductType()
																{
																		Name = "Gift",
																		Description = "Gift for bff",
																		PictureUrl = "images/types/gift.jpg",
																		Status = true
																},
																new ProductType()
																{
																		Name = "Wallet",
																		Description = "Wallets for lover",
																		PictureUrl = "images/types/wallet.jpg",
																		Status = true
																},
																new ProductType()
																{
																		Name = "Anime",
																		Description = "Anime for wibuuuu",
																		PictureUrl = "images/types/anime.jpg",
																		Status = true
																},
																new ProductType()
																{
																		Name = "Beauty",
																		Description = "Beauty for trap",
																		PictureUrl = "images/types/beauty.jpg",
																		Status = true
																}
								}
						);
						context.SaveChanges();
					}
					if (!context.ProductBrands.Any())
					{
						context.ProductBrands.AddRange(
								new List<ProductBrand>()
								{
																new ProductBrand()
																{
																		Name = "China",
																		Description = "Hangxom",
																		PictureUrl = "images/brands/cn.jpg",
																		Status = true
																},
																new ProductBrand()
																{
																		Name = "Vietnam",
																		Description = "Hang VNCLC",
																		PictureUrl = "images/brands/vn.jpg",
																		Status = true
																},
																new ProductBrand()
																{
																		Name = "USA",
																		Description = "Hangmeo",
																		PictureUrl = "images/brands/us.jpg",
																		Status = true
																},
																new ProductBrand()
																{
																		Name = "UK",
																		Description = "Hangxomnhaanh",
																		PictureUrl = "images/brands/uk.jpg",
																		Status = true
																},
																new ProductBrand()
																{
																		Name = "Japan",
																		Description = "Hangnhat",
																		PictureUrl = "images/brands/jp.jpg",
																		Status = true
																},
																new ProductBrand()
																{
																		Name = "Korea",
																		Description = "Hangxeng",
																		PictureUrl = "images/brands/kr.jpg",
																		Status = true
																},
																new ProductBrand()
																{
																		Name = "Thailand",
																		Description = "Thaisgei",
																		PictureUrl = "images/brands/tl.jpg",
																		Status = true
																}
								}
						);
						context.SaveChanges();
					}
					if (!context.Products.Any())
					{
						context.Products.AddRange(
								new List<Product>()
								{
																new Product()
																{
																		Name = "One Piece = Monkey D. Luffy (GEAR 5) ",
																		Description =
																				"Hình ảnh chỉ man tính chất minh họa, Hình ảnh chỉ man tính chất minh họa, Hình ảnh chỉ man tính chất minh họa, Hình ảnh chỉ man tính chất minh họa, Hình ảnh chỉ man tính chất minh họa, Hình ảnh chỉ man tính chất minh họa, Hình ảnh chỉ man tính chất minh họa",
																		Price = 12.99m,
																		PictureUrl = "images/products/1.jpg",
																		ProductTypeId = 4,
																		ProductBrandId = 5,
																		ProductCode = 1234567,
																		Quantity = 100,
																		Status = true
																},
																new Product()
																{
																		Name = "Gift for crush that makes him crazy",
																		Description = "Qua cho crush",
																		Price = 99.99m,
																		PictureUrl = "images/products/2.jpg",
																		ProductTypeId = 1,
																		ProductBrandId = 1,
																		ProductCode = 1234568,
																		Quantity = 100,
																		Status = true
																},
																new Product()
																{
																		Name = "Pablo Picasso | Pace Gallery",
																		Description = "Picasso....",
																		Price = 24.99m,
																		PictureUrl = "images/products/3.jpg",
																		ProductTypeId = 2,
																		ProductBrandId = 2,
																		ProductCode = 1234569,
																		Quantity = 100,
																		Status = true
																},
																new Product()
																{
																		Name =
																				"Mattel Barbie the Movie Margot Robbie Barbie In Pink Western Outfit Collectible Doll ",
																		Description = "I'm a barbie girl, in the barbie world",
																		Price = 15.00m,
																		PictureUrl = "images/products/4.jpg",
																		ProductTypeId = 3,
																		ProductBrandId = 2,
																		Quantity = 100,
																		Status = true
																},
																new Product()
																{
																		Name =
																				"Vegetarian cosmetics, clean cosmetics and organic cosmetics",
																		Description =
																				"Vegetarian cosmetics, clean cosmetics and organic cosmetics for girl.",
																		Price = 187.99m,
																		PictureUrl = "images/products/5.jpg",
																		ProductTypeId = 4,
																		ProductBrandId = 4,
																		ProductCode = 1234561,
																		Quantity = 100,
																		Status = true
																},
																new Product()
																{
																		Name = "Ví SEN 3 - Khacten.com",
																		Description = "Ví SEN 3 - Khacten.com",
																		Price = 21.99m,
																		PictureUrl = "images/products/6.jpg",
																		ProductTypeId = 4,
																		ProductBrandId = 5,
																		ProductCode = 1234562,
																		Quantity = 100,
																		Status = true
																},
																new Product()
																{
																		Name = "Chinese New Year Dragon Stock Illustrations",
																		Description =
																				"Happy new year.Chinese New Year Dragon Stock Illustrations.",
																		Price = 21.87m,
																		PictureUrl = "images/products/7.jpg",
																		ProductTypeId = 4,
																		ProductBrandId = 2,
																		ProductCode = 1234563,
																		Quantity = 100,
																		Status = true
																},
																new Product()
																{
																		Name = "DRAGON BALL - 30TH ANNIV. SUPER HISTORY BOOK",
																		Description = "DRAGON BALL - 30TH ANNIV. SUPER HISTORY BOOK.",
																		Price = 14.95m,
																		PictureUrl = "images/products/8.jpg",
																		ProductTypeId = 4,
																		ProductBrandId = 4,
																		ProductCode = 1234565,
																		Quantity = 100,
																		Status = true
																},
																new Product()
																{
																		Name =
																				"Elie Saab Le Parfum Royal Gift Set EDP 50 ml - Spar 26%",
																		Description =
																				"Elie Saab Le Parfum Royal Gift Set EDP 50 ml - Spar 26%.",
																		Price = 35.01m,
																		PictureUrl = "images/products/9.jpg",
																		ProductTypeId = 4,
																		ProductBrandId = 6,
																		ProductCode = 1234564,
																		Quantity = 100,
																		Status = true
																},
																new Product()
																{
																		Name =
																				"12 x Antique Japanese postcards – a set of 12 individual 19th century reproduction art",
																		Description =
																				"12 x Antique Japanese postcards – a set of 12 individual 19th century reproduction ar.",
																		Price = 32.43m,
																		PictureUrl = "images/products/10.jpg",
																		ProductTypeId = 4,
																		ProductBrandId = 3,
																		ProductCode = 1234512,
																		Quantity = 100,
																		Status = true
																},
																new Product()
																{
																		Name =
																				"HOT TOYS BATMAN SPECIAL - BEN AFFLECK BATMAN FIGURE COLLECTION",
																		Description =
																				"HOT TOYS BATMAN SPECIAL - BEN AFFLECK BATMAN FIGURE COLLECTION",
																		Price = 32.89m,
																		PictureUrl = "images/products/11.jpg",
																		ProductTypeId = 4,
																		ProductBrandId = 3,
																		ProductCode = 1234513,
																		Quantity = 100,
																		Status = true
																},
																new Product()
																{
																		Name = "Harry Potter = A Pop-Up Book",
																		Description = "Harry Potter = A Pop-Up Book",
																		Price = 35.01m,
																		PictureUrl = "images/products/12.jpg",
																		ProductTypeId = 4,
																		ProductBrandId = 4,
																		ProductCode = 1234514,
																		Quantity = 100,
																		Status = false
																}
								}
						);
						context.SaveChanges();
					}
					if (!context.DeliveryMethods.Any())
					{
						context.DeliveryMethods.AddRange(
								new List<DeliveryMethod>()
								{
																new DeliveryMethod()
																{
																		ShortName = "UPS1",
																		Description = "Fastest delivery time",
																		DeliveryTime = "1-2 Days",
																		Price = 10
																},
																new DeliveryMethod()
																{
																		ShortName = "UPS2",
																		Description = "Get it within 5 days",
																		DeliveryTime = "2-5 Days",
																		Price = 5
																},
																new DeliveryMethod()
																{
																		ShortName = "UPS3",
																		Description = "Slower but cheap",
																		DeliveryTime = "5-10 Days",
																		Price = 2
																},
																new DeliveryMethod()
																{
																		ShortName = "FREE",
																		Description = "Free! You get what you pay for",
																		DeliveryTime = "1-2 Weeks",
																		Price = 0
																}
								}
						);
						context.SaveChanges();
					}
				}

				var userManager = serviceScope.ServiceProvider.GetRequiredService<
						UserManager<AppUser>
				>();
				await IdentityInitializer.SeedUserAsync(userManager);
			}
		}
	}
}
