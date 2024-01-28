using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTO;
using api.Entities;
using api.Entities.Identity;
using AutoMapper;

namespace api.Helpers
{
  public class MyAutoMapper : Profile
  {
    public MyAutoMapper()
    {
      CreateMap<Product, ReturnProduct>()
          .ForMember(d => d.ProductBrand, o => o.MapFrom(s => s.ProductBrand.Name))
          .ForMember(d => d.ProductType, o => o.MapFrom(s => s.ProductType.Name))
          .ForMember(d => d.PictureUrl, o => o.MapFrom<ProductImageUrlResolver>());

      CreateMap<ProductType, ReturnProductType>().ForMember(d => d.PictureUrl, o => o.MapFrom<TypeImageUrlResolver>());

      CreateMap<ProductBrand, ReturnProductBrand>().ForMember(d => d.PictureUrl, o => o.MapFrom<BrandImageUrlResolver>());

      CreateMap<Address, ReturnAddress>().ReverseMap();
    }
  }
}