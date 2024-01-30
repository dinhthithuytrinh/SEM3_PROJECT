using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DAO;
using api.DTO;
using api.Entities;

namespace api.Services
{
  public class ProductService : IProductService
  {
    private readonly IUnitOfWork _unitOfWork;
    public static IWebHostEnvironment _environment;
    private IConfiguration _config;

    public ProductService(IUnitOfWork unitOfWork,
                        IWebHostEnvironment environment,
                        IConfiguration config)
    {
      _unitOfWork = unitOfWork;
      _environment = environment;
      _config = config;
    }

    public async Task<int> addOrUpdateProduct(ProductPost input)
    {
      string baseUrl = _config["ApiUrl"];
      try
      {
        if (input.Picture != null && input.Picture.Length > 0)
        {
          if (!Directory.Exists(Path.Combine(_environment.WebRootPath, "images", "products")))
          {
            Directory.CreateDirectory(Path.Combine(_environment.WebRootPath, "images", "products"));
          }

          if (!String.IsNullOrEmpty(input.PictureUrl))
          {
            var oldFilePath = input.PictureUrl.Remove(0, baseUrl.Length);
            if (File.Exists(Path.Combine(_environment.WebRootPath, oldFilePath)))
            {
              File.Delete(Path.Combine(_environment.WebRootPath, oldFilePath));
            }
          }

          Guid fileName = Guid.NewGuid();
          var fileUrl = Path.Combine("images", "products", fileName.ToString() + Path.GetExtension(input.Picture.FileName));

          using (FileStream filestream = System.IO.File.Create(Path.Combine(_environment.WebRootPath, fileUrl)))
          {
            input.Picture.CopyTo(filestream);
            filestream.Flush();
          }

          input.PictureUrl = fileUrl;
        }

        var brand = _unitOfWork.ProductBrandRepository.QueryWithConditions(
            filter: x => x.Name == input.ProductBrand,
            orderBy: null,
            includeProperties: null
        );
        var type = _unitOfWork.ProductTypeRepository.QueryWithConditions(
            filter: x => x.Name == input.ProductType,
            orderBy: null,
            includeProperties: null
        );

        Product product;
        if (input.Id > 0)
        {
          var query = await _unitOfWork.ProductRepository.GetEntities(
              filter: i => i.Id == input.Id,
              orderBy: null,
              includeProperties: "ProductType,ProductBrand"
          );

          product = query.FirstOrDefault();
          product.Name = input.Name;
          product.Description = input.Description;
          product.Price = input.Price;
          product.PictureUrl = input.PictureUrl;
          product.ProductBrand = brand.FirstOrDefault();
          product.ProductType = type.FirstOrDefault();

          _unitOfWork.ProductRepository.Update(product);

        }
        else
        {
          product = new Product
          {
            Name = input.Name,
            Description = input.Description,
            Price = input.Price,
            PictureUrl = input.PictureUrl,
            ProductBrand = brand.FirstOrDefault(),
            ProductType = type.FirstOrDefault(),
          };
          _unitOfWork.ProductRepository.Add(product);
        }

        var updatedRecord = _unitOfWork.Save();

        if (updatedRecord > 0)
          return product.Id;

        return 0;
      }
      catch (Exception)
      {
        throw;
      }
    }


    public async Task deleteProduct(int productId)
    {
      if (productId > 0)
      {
        string baseUrl = _config["ApiUrl"];

        var query = await _unitOfWork.ProductRepository.GetEntities(
            filter: i => i.Id == productId,
            orderBy: null,
            includeProperties: "ProductType,ProductBrand"
        );

        var product = query.FirstOrDefault();

        if (!String.IsNullOrEmpty(product.PictureUrl))
        {
          var oldFilePath = product.PictureUrl.Remove(0, baseUrl.Length);
          if (File.Exists(Path.Combine(_environment.WebRootPath, oldFilePath)))
          {
            File.Delete(Path.Combine(_environment.WebRootPath, oldFilePath));
          }
        }

        _unitOfWork.ProductRepository.DeleteById(productId);
        _unitOfWork.Save();
      }
    }
  }
}