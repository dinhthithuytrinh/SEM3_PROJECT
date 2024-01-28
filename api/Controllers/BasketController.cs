using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using api.DAO;
using api.DTO;
using api.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace api.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class BasketController : ControllerBase
  {
    private readonly IBasketRepository _basketRepository;
    private readonly IMapper _mapper;
    public BasketController(IBasketRepository basketRepository, IMapper mapper)
    {
      _basketRepository = basketRepository;
      _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<CustomerBasket>> GetBasketById(string id)
    {
      var basket = await _basketRepository.GetBasketAsync(id);
      return Ok(basket ?? new CustomerBasket(id));
    }

    [HttpPost]
    public async Task<ActionResult<CustomerBasket>> UpdateBasket(ReturnCustomerBasket basket)
    {
      var customerBasket = _mapper.Map<CustomerBasket>(basket);
      var updatedBasket = await _basketRepository.UpdateBasketAsync(customerBasket);
      return Ok(updatedBasket);
    }

    [HttpDelete]
    public async Task DeleteBasketAsync(string id)
    {
      await _basketRepository.DeleteBasketAsync(id);
    }

  }
}