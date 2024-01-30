using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using api.DTO;
using api.Entities.OrderAggregate;
using api.Exceptions;
using api.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;
        private readonly IMapper _mapper;

        public OrdersController(IOrderService orderService, IMapper mapper)
        {
            _orderService = orderService;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(OrderDto orderDto)
        {
            string email = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
            var address = _mapper.Map<ReturnAddress, Address>(orderDto.ShipToAddress);
            var order = await _orderService.CreateOrderAsync(email, orderDto.DeliveryMethodId, orderDto.BasketId, address);

            if (order == null)
                return BadRequest(new ErrorResponse(400, "Problem creating order"));

            return Ok(order);
        }

        // [HttpGet("deliveryMethods")]
        // public async Task<ActionResult<List<DeliveryMethod>>> GetDeliveryMethods()
        // {
        //     List<DeliveryMethod> deliveryMethods = await _orderService.GetDeliveryMethodsAsync();
        //     return Ok(deliveryMethods);
        // }

        [HttpGet("deliveryMethods")]
        public async Task<ActionResult<IReadOnlyList<DeliveryMethod>>> GetDeliveryMethods()
        {
            return Ok(await _orderService.GetDeliveryMethodsAsync());
        }

        [HttpGet]
        public async Task<ActionResult<List<ReturnOrderDto>>> GetOrderListForUser()
        {
            string email = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
            List<Order> orders = await _orderService.GetOrdersForUserAsync(email);
            return Ok(_mapper.Map<List<Order>, List<ReturnOrderDto>>(orders));
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<ReturnOrderDto>> GetOrderByIdForUser(int id)
        {
            string email = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
            Order order = await _orderService.GetOrderByIdAsync(id, email);
            if (order == null)
                return NotFound(new ErrorResponse(404));
            return Ok(_mapper.Map<Order, ReturnOrderDto>(order));
        }
    }
}