using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTO;
using api.Entities;
using AutoMapper;

namespace api.Helpers
{
  public class TypeImageUrlResolver : IValueResolver<ProductType, ReturnProductType, string>
  {
    private IConfiguration _config;

    public TypeImageUrlResolver(IConfiguration config)
    {
      _config = config;
    }

    public string Resolve(ProductType source, ReturnProductType destination, string destMember, ResolutionContext context)
    {
      if (!string.IsNullOrEmpty(source.PictureUrl))
      {
        string baseUrl = _config["ApiUrl"];
        return baseUrl + source.PictureUrl;
      }

      return null;
    }
  }
}