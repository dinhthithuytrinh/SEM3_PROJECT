using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Exceptions;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
  [ApiController]
  [Route("/errors/{errorCode}")]
  public class HandleErrorController : ControllerBase
  {

    public IActionResult Error(int errorCode)
    {
      return new ObjectResult(new ErrorResponse(errorCode));
    }
  }
}