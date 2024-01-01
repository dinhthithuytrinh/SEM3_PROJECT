using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DAO;
using api.Entities;
using api.Exceptions;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class BuggyController : ControllerBase
  {
    private readonly IUnitOfWork _unitOfWOrk;

    public BuggyController(IUnitOfWork unitOfWOrk)
    {
      _unitOfWOrk = unitOfWOrk;
    }

    /// 404 page not found

    /// 400 Bad request
    [HttpGet("badrequest")]
    public ActionResult GetBadRequest()
    {
      return BadRequest(new ErrorResponse(400));
    }

    /// 400 validation error -- input string in the id field
    [HttpGet("badrequest/{id}")]
    public ActionResult GetValidationError(int id)
    {
      return Ok();
    }

    /// 500 server error
    [HttpGet("servererror")]
    public async Task<ActionResult> GetServerError()
    {
      Product notfoundProduct = await _unitOfWOrk.ProductRepository.GetEntityById("1000");
      return Ok(notfoundProduct.ToString());
    }
  }
}