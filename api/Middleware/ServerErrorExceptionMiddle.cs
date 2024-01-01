using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using api.Exceptions;

namespace api.Middleware
{
  public class ServerErrorExceptionMiddle
  {
    private readonly RequestDelegate _next;
    private readonly IHostEnvironment _env;

    public ServerErrorExceptionMiddle(RequestDelegate next, IHostEnvironment env)
    {
      _next = next;
      _env = env;
    }

    public async Task InvokeAsync(HttpContext context)
    {
      try
      {
        await _next(context);
      }
      catch (Exception ex)
      {
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

        ErrorResponse response = _env.IsDevelopment()
            ? new ErrorResponse((int)HttpStatusCode.InternalServerError, ex.Message + ". Stacktrace: " + ex.StackTrace.ToString())
            : new ErrorResponse((int)HttpStatusCode.InternalServerError);

        var option = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

        string json = JsonSerializer.Serialize(response, option);

        await context.Response.WriteAsync(json);
      }
    }
  }
}