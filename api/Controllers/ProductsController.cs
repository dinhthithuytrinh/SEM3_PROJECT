using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DAO;
using api.Data;
using api.DTO;
using api.Entities;
using api.Helpers;

using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class ProductsController : ControllerBase
  {
    private readonly IProductRepository _productRepository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    private readonly IConfiguration _configuration;
    private readonly ApplicationDbContext _Db;
    private static readonly Random random = new Random();

    private readonly IWebHostEnvironment _webHostEnvironment;
    public ProductsController(IUnitOfWork unitOfWork, IProductRepository productRepository, IMapper mapper, ApplicationDbContext Db, IConfiguration configuration, IWebHostEnvironment webHostEnvironment)
    {
      _unitOfWork = unitOfWork;
      _productRepository = productRepository ;
      _mapper = mapper;
      _configuration = configuration;
      _webHostEnvironment = webHostEnvironment;

      _Db = Db;
    }

    [HttpGet]
    public ActionResult<PagedList<Product>> GetProducts(
                    [FromQuery] ProductRequestParams productRequestParams,
                    [FromQuery] PaginationParams pagination)
    {
      Func<IQueryable<Product>, IOrderedQueryable<Product>> sortedQuery;

      if (productRequestParams.Sort != null)
      {
        switch (productRequestParams.Sort)
        {
          case "priceAsc":
            sortedQuery = q => q.OrderBy(i => i.Price);
            break;
          case "priceDesc":
            sortedQuery = q => q.OrderByDescending(i => i.Price);
            break;
          case "nameAsc":
            sortedQuery = q => q.OrderBy(i => i.Name);
            break;
          case "nameDesc":
            sortedQuery = q => q.OrderByDescending(i => i.Name);
            break;
          case "updateDate":
            sortedQuery = q => q.OrderBy(i => i.UpdateBy);
            break;
          default:
            sortedQuery = q => q.OrderByDescending(s => s.UpdateBy);
            break;
        }
      }
      else
      {
        sortedQuery = q => q.OrderByDescending(i => i.UpdateBy);
      }

      IQueryable<Product> query = _unitOfWork.ProductRepository.QueryWithCondition(
        filter: x =>
                (string.IsNullOrEmpty(productRequestParams.Search)
                    || x.Name.ToLower().Contains(productRequestParams.Search)
                    || x.Description.ToLower().Contains(productRequestParams.Search))
                && (!productRequestParams.TypeId.HasValue
                    || x.ProductTypeId == productRequestParams.TypeId)
                && (!productRequestParams.BrandId.HasValue
                    || x.ProductBrandId == productRequestParams.BrandId),
        orderBy: sortedQuery,
        includeProperties: "ProductType,ProductBrand"
);

      int totalRecord = query.Count();

      query = query.Skip(pagination.PageSize * (pagination.PageNumber - 1)).Take(pagination.PageSize);

      List<ReturnProduct> returnData = _mapper.Map<List<Product>, List<ReturnProduct>>(query.ToList());

      return Ok(new PagedList<ReturnProduct>(
          pagination.PageNumber,
          pagination.PageSize,
          totalRecord,
          returnData
      ));
    }




    [HttpPost("Create")]
    public async Task<IActionResult> CreateProduct([FromForm] FileUpLoadAPI p)
    {
      p.ProductCode = GenerateUniqueProductCode();
      string baseUrl = _configuration["ApiUrl"];
      var findP = _Db.Products.Find(p.ProductId);
      if (findP != null)
      {
        return Ok("Co roi khong can tao");
      }
      else
      {
        var product = new Product { Id = p.ProductId, ProductCode = p.ProductCode, Name = p.Name, Description = p.Description, Price = p.Price, ProductBrandId = p.ProductBrandId, ProductTypeId = p.ProductTypeId, Quantity = p.Quantity, Status = true, CreatedBy = p.CreatedBy, UpdateBy = p.UpdateBy };
        if (p.files.Length > 0)
        {
          var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", "products", p.files.FileName);
          using (var stream = System.IO.File.Create(path))
          {
            await p.files.CopyToAsync(stream);
          }

          product.PictureUrl = baseUrl + "images/products/" + p.files.FileName;
        }
        else
        {
          product.PictureUrl = "";
        }
        _unitOfWork.ProductRepository.Add(product);
        _unitOfWork.Save();
        return BadRequest(product);
      }
    }

    private int GenerateUniqueProductCode()
    {
      // Sử dụng hàm ngẫu nhiên để tạo mã ngẫu nhiên với độ dài 7
      return random.Next(1000000, 9999999);
    }

    [HttpPut("{Id}")]

    public ActionResult<Product> UpdateProduct(int id, [FromForm] Product productUpdate, [FromForm] FileUpLoadAPI f)
    {
      try{
        var existingProduct = _Db.Products.AsNoTracking().FirstOrDefault(p => p.Id == id);
        string baseUrl = _configuration["ApiUrl"];

        productUpdate.ProductCode = existingProduct.ProductCode;


  
        if (existingProduct.Id != productUpdate.Id)
        {
          return BadRequest("NO Data");
        }
        else
        {
          if (existingProduct == null)
          {
            return NotFound("Product not found");
          }
          if (productUpdate.Name != null)
          {
            existingProduct.Name = productUpdate.Name;
          }

          if (productUpdate.Status != null)
          {
            existingProduct.Status = productUpdate.Status;
          }
          if (productUpdate.Description != null)
          {
            existingProduct.Description = productUpdate.Description;
          }

          if (productUpdate.Price != null)
          {
            existingProduct.Price = productUpdate.Price;
          }
          if (productUpdate.ProductBrandId != null)
          {
            existingProduct.ProductBrandId = productUpdate.ProductBrandId;
          }

          if (productUpdate.ProductTypeId != null)
          {
            existingProduct.ProductTypeId = productUpdate.ProductTypeId;
          }
          if (productUpdate.Quantity != null)
          {
            existingProduct.Quantity = productUpdate.Quantity;
          }
          if (productUpdate.PictureUrl != null)
          {
            existingProduct.PictureUrl = productUpdate.PictureUrl;
          }
          if (f != null && f.files != null)
          {
            var imagePath = SaveImage(f);
            existingProduct.PictureUrl = baseUrl + imagePath;
          }
          _unitOfWork.ProductRepository.Update(existingProduct);
          _unitOfWork.Save();
        }
        

        return BadRequest(existingProduct);

      }
      catch (Exception ex)
      {
        return StatusCode(500, $"Internal Server Error: {ex.Message}");
      }

    }

   
    private string SaveImage(FileUpLoadAPI p)
    {
      string baseUrl = _configuration["ApiUrl"];

      var imageName = p.files.FileName;
      var directoryPath = Path.Combine("images", "products");
      var path = Path.Combine(directoryPath, imageName);
      string urlPath = path.Replace("\\", "/");


      using (var stream = System.IO.File.Create(urlPath))
      {
        p.files.CopyToAsync(stream);
      }

      return urlPath;
    }

    [HttpDelete("Delete")]
    public async Task<ActionResult<Product>> Delete([FromForm] int id)
    {
      var product = await _unitOfWork.ProductRepository.GetEntityById(id);

      if (product == null)
      {
        return BadRequest("khong co ma xoa");
      }
      else
      {
        _unitOfWork.ProductRepository.DeleteById(id);
      }

      _unitOfWork.Save();

      return Ok("delete successfully");

    }

  

    [HttpGet("{id}")]
    public async Task<ActionResult<ReturnProduct>> GetSingleProduct(int id)
    {
      var query = await _unitOfWork.ProductRepository.GetEntities(
          filter: i => i.ProductCode == id,
          orderBy: null,
          includeProperties: "ProductType,ProductBrand"
      );

      Product product = query.FirstOrDefault();
      return Ok(_mapper.Map<Product, ReturnProduct>(product));
      // return Ok(product);
      // return Ok(new ReturnProduct
      // {
      //   Id = product.Id,
      //   ProductCode = product.ProductCode,
      //   Name = product.Name,
      //   Description = product.Description,
      //   PictureUrl = product.PictureUrl,
      //   Price = product.Price,
      //   Quantity = product.Quantity,
      //   Status = product.Status,
      //   ProductBrand = product.ProductBrand.Name,
      //   ProductType = product.ProductType.Name,
      //   CreatedBy = product.CreatedBy,
      //   UpdateBy = product.UpdateBy
      // });
    }



    [HttpGet("detail/{id}")]
    public async Task<ActionResult<ReturnProduct>> GetDetailProduct(int id)
    {
      Product product = await _productRepository.GetProductById(id);
      return Ok(_mapper.Map<Product, ReturnProduct>(product));
      // return Ok(new ReturnProduct
      // {
      //   Id = product.Id,
      //   ProductCode = product.ProductCode,
      //   Name = product.Name,
      //   Description = product.Description,
      //   PictureUrl = product.PictureUrl,
      //   Price = product.Price,
      //   Quantity = product.Quantity,
      //   Status = product.Status,
      //   ProductBrand = product.ProductBrand.Name,
      //   ProductType = product.ProductType.Name,
      //   CreatedBy = product.CreatedBy,
      //   UpdateBy = product.UpdateBy
      // });
    }

    [HttpGet("origins")]
    // public async Task<ActionResult<List<ProductBrand>>> GetProductBrands()
    // {
    //   IEnumerable<ProductBrand> productBrands = await _unitOfWork.ProductBrandRepository.GetAll();
    //   return Ok(productBrands);
    // }
    public async Task<ActionResult<List<ProductBrand>>> GetProductBrands()
    {
      IEnumerable<ProductBrand> productBrands = await _unitOfWork.ProductBrandRepository.GetEntities(
          filter: null,
          orderBy: null,
          includeProperties: null
      );
      // return Ok(productTypes);
      return Ok(_mapper.Map<IEnumerable<ProductBrand>, IEnumerable<ReturnProductBrand>>(productBrands));
    }

    [HttpPost("origins/Create")]
    public async Task<IActionResult> CreateProductBrand([FromForm] FileUpLoadProductBrand p)
    {


      var findP = _Db.Products.Find(p.ProductBrandId);
      string baseUrl = _configuration["ApiImgUrl"];


      if (findP != null)
      {
        return Ok("Co roi khong can tao");
      }
      else
      {
        var productBrand = new ProductBrand { Id = p.ProductBrandId, Name = p.Name, Description = p.Description, Status = p.Status, CreatedBy = p.CreatedBy, UpdateBy = p.UpdateBy };
        if (p.files.Length > 0)
        {
          var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", "brands", p.files.FileName);
          using (var stream = System.IO.File.Create(path))
          {
            await p.files.CopyToAsync(stream);
          }

          productBrand.PictureUrl = baseUrl + "images/brands/" + p.files.FileName;
        }
        else
        {
          productBrand.PictureUrl = "";
        }
        _unitOfWork.ProductBrandRepository.Add(productBrand);
        _unitOfWork.Save();
        return BadRequest(productBrand);
      }
    }

    [HttpGet("types")]
    // public async Task<ActionResult<List<ProductType>>> GetProductTypes()
    // {
    //   // IEnumerable<ProductType> productTypes = await _unitOfWork.ProductTypeRepository.GetAll();
    //   // // return Ok(productTypes);
    //   // return Ok(_mapper.Map<ProductType, ReturnProductType>(productTypes));
    // }
    public async Task<ActionResult<List<ProductType>>> GetProductTypes()
    {
      IEnumerable<ProductType> productTypes = await _unitOfWork.ProductTypeRepository.GetEntities(
          filter: null,
          orderBy: null,
          includeProperties: null
      );
      // return Ok(productTypes);
      return Ok(_mapper.Map<IEnumerable<ProductType>, IEnumerable<ReturnProductType>>(productTypes));
    }


    [HttpPost("AddProductType")]
    public async Task<IActionResult> CreateProductType([FromForm] FileUpLoadProducType p)
    {
      string baseUrl = _configuration["ApiImgUrl"];

      var findP = _Db.Products.Find(p.ProductTypeId);
      if (findP != null)
      {
        return Ok("Co roi khong can tao");
      }
      else
      {
        var productType = new ProductType { Id = p.ProductTypeId, Name = p.Name, Description = p.Description, Status = p.Status, CreatedBy = p.CreatedBy, UpdateBy = p.UpdateBy };
        if (p.files.Length > 0)
        {
          var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", "types", p.files.FileName);
          using (var stream = System.IO.File.Create(path))
          {
            await p.files.CopyToAsync(stream);
          }

          productType.PictureUrl = baseUrl + "images/types/" + p.files.FileName;
        }
        else
        {
          productType.PictureUrl = "";
        }
        _unitOfWork.ProductTypeRepository.Add(productType);
        _unitOfWork.Save();
        return BadRequest(productType);
      }
    }

  }
}