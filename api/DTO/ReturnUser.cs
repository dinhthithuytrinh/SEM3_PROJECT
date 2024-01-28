using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTO
{
  public class ReturnUser
  {
    public string Email { get; set; }
    public string DisplayName { get; set; }
    public string Token { get; set; }
  }
}