using api.DAO;
using api.Data;
using api.DTO;
using api.Entities;
using api.Helpers;
using api.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
  private readonly IUnitOfWork _unitOfWork;
  private IMapper _mapper;
  private IProductService _productService;

  public ProductsController(
      IUnitOfWork unitOfWork,
      IMapper mapper,
      IProductService productService
  )
  {
    _unitOfWork = unitOfWork;
    _mapper = mapper;
    _productService = productService;
  }

  [HttpGet]
  public ActionResult<PagedList<ReturnProduct>> GetProducts(
      [FromQuery] ProductRequestParams productRequestParams,
      [FromQuery] PaginationParams pagination
  )
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

    IQueryable<Product> query = _unitOfWork.ProductRepository.QueryWithConditions(
        filter: x =>
            (
                string.IsNullOrEmpty(productRequestParams.Search)
                || x.Name.ToLower().Contains(productRequestParams.Search)
            )
            && (
                !productRequestParams.BrandId.HasValue
                || x.ProductBrandId == productRequestParams.BrandId
            )
            && (
                !productRequestParams.TypeId.HasValue
                || x.ProductTypeId == productRequestParams.TypeId
            )
            && (!productRequestParams.Client.HasValue || x.Status == true),
        orderBy: sortedQuery,
        includeProperties: "ProductType,ProductBrand"
    );

    int totalRecord = query.Count();

    query = query
        .Skip(pagination.PageSize * (pagination.PageNumber - 1))
        .Take(pagination.PageSize);

    List<ReturnProduct> returnData = _mapper.Map<List<Product>, List<ReturnProduct>>(
        query.ToList()
    );
    return Ok(
        new PagedList<ReturnProduct>(
            pagination.PageNumber,
            pagination.PageSize,
            totalRecord,
            returnData
        )
    );
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
  }

  [HttpGet("origins")]
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

  [HttpGet("types")]
  public async Task<ActionResult<List<ProductType>>> GetProductTypes()
  {
    // return Ok(await _unitOfWork.ProductTypeRepository.GetAll());
    IEnumerable<ProductType> productTypes = await _unitOfWork.ProductTypeRepository.GetEntities(
          filter: null,
          orderBy: null,
          includeProperties: null
      );
    // return Ok(productTypes);
    return Ok(_mapper.Map<IEnumerable<ProductType>, IEnumerable<ReturnProductType>>(productTypes));
  }

  [HttpPost]
  public async Task<ActionResult<ReturnProduct>> AddProduct([FromForm] ProductPost input)
  {
    var productId = await _productService.addOrUpdateProduct(input);

    var query = await _unitOfWork.ProductRepository.GetEntities(
        filter: i => i.Id == productId,
        orderBy: null,
        includeProperties: "ProductType,ProductBrand"
    );

    Product product = query.FirstOrDefault();
    return Ok(_mapper.Map<Product, ReturnProduct>(product));
  }

  [HttpPut]
  public async Task<ActionResult<ReturnProduct>> UpdateProduct([FromForm] ProductPost input)
  {
    var productId = await _productService.addOrUpdateProduct(input);

    var query = await _unitOfWork.ProductRepository.GetEntities(
        filter: i => i.Id == productId,
        orderBy: null,
        includeProperties: "ProductType,ProductBrand"
    );

    Product product = query.FirstOrDefault();
    return Ok(_mapper.Map<Product, ReturnProduct>(product));
  }

  [HttpDelete("{id}")]
  public async Task<ActionResult> DeleteProduct(int id)
  {
    await _productService.deleteProduct(id);
    return Ok("delete successful");
  }
}
