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
    public ProductsController(IUnitOfWork unitOfWork, IProductRepository productRepository, IMapper mapper)
    {
      _unitOfWork = unitOfWork;
      _productRepository = productRepository;
      _mapper = mapper;
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

    // public async Task<ActionResult<List<Product>>> GetProducts(string sort, int? brandId, int? typeId) {
    //         Func<IQueryable<Product>, IOrderedQueryable<Product>> sortedQuery;

    //         if (sort != null) {
    //             switch (sort)
    //             {
    //                 case "priceAsc":
    //                     sortedQuery = q => q.OrderBy(i => i.Price);
    //                     break;
    //                 case "priceDesc":
    //                     sortedQuery = q => q.OrderByDescending(i => i.Price);
    //                     break;
    //                 default:
    //                     sortedQuery = q => q.OrderBy(i => i.Name);
    //                     break;
    //             }
    //         } else {
    //             sortedQuery = q => q.OrderBy(i => i.Name);
    //         }

    //         IEnumerable<Product> products = await _unitOfWork.ProductRepository.GetEntities(
    //             filter: x => (!typeId.HasValue || x.ProductTypeId == typeId) && (!brandId.HasValue || x.ProductBrandId == typeId),
    //             orderBy: sortedQuery,
    //             includeProperties: "ProductType,ProductBrand"
    //         );

    //         return Ok(_mapper.Map<IEnumerable<Product>, IEnumerable<ReturnProduct>>(products));
    //         // return Ok(products.Select(item => new ReturnProduct {
    //         //     Id = item.Id,
    //         //     Name = item.Name,
    //         //     Description = item.Description,
    //         //     PictureUrl = item.PictureUrl,
    //         //     Price = item.Price,
    //         //     ProductBrand = item.ProductBrand.Name,
    //         //     ProductType = item.ProductType.Name
    //         // }).ToList());
    //     }

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
    public async Task<ActionResult<List<ProductBrand>>> GetProductBrands()
    {
      IEnumerable<ProductBrand> productBrands = await _unitOfWork.ProductBrandRepository.GetAll();
      return Ok(productBrands);
    }

    [HttpGet("types")]
    public async Task<ActionResult<List<ProductType>>> GetProductTypes()
    {
      IEnumerable<ProductType> productTypes = await _unitOfWork.ProductTypeRepository.GetAll();
      return Ok(productTypes);
    }
  }
}