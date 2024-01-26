using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Entities
{
  public class User 
  {
    public int Id { get; set; }
    public int? Code { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Username { get; set; }
    public string? Email { get; set; }
    public string? Phone { get; set; }
    public string? Address { get; set; }
    public string? Password { get; set; }
    public string? Avatar { get; set; }
    public string? Token { get; set; }
    public string? RefreshToken { get; set; }
    public DateTime? RefreshTokenExpiryTime { get; set; }
    public Role Role { get; set; }
    public int? RoleId { get; set; }


    public Gender Gender { get; set; }
    public int? GenderId { get; set; }

    public Boolean? Status { get; set; }
    public DateTime CreatedBy { get; set; } = DateTime.Now;
    public DateTime UpdateBy { get; set; } = DateTime.Now;
  }
}