using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Exceptions
{
  public class ErrorResponse
  {
    public int StatusCode { get; set; }
    public string Message { get; set; }

    private string getDefaultMessageFromStatusCode(int statusCode)
    {
      return statusCode switch
      {
        201 => "Email already exists!",
        202 => "User creation failed! Please check user details and try again.",
        203 => "Username already exists!",
        400 => "A bad request from client",
        401 => "You are not authorized",
        404 => "Resource not found",
        500 => "Server error",
        _ => null
      };
    }

    public ErrorResponse(int statusCode, string message = null)
    {
      StatusCode = statusCode;
      Message = message ?? getDefaultMessageFromStatusCode(statusCode);
    }
  }
}