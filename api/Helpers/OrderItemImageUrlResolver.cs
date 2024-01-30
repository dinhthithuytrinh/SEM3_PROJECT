using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTO;
using api.Entities.OrderAggregate;
using AutoMapper;

namespace api.Helpers
{
  public class OrderItemImageUrlResolver : IValueResolver<OrderItem, ReturnOrderItemDto, string>
  {
    private IConfiguration _config;
    public OrderItemImageUrlResolver(IConfiguration config)
    {
      _config = config;
    }
    public string Resolve(OrderItem source, ReturnOrderItemDto destination, string destMember, ResolutionContext context)
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