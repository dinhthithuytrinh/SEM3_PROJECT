using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace api.Data
{
  public class IdentityInitializer
  {
    public static async Task SeedUserAsync(UserManager<AppUser> userManager)
    {
      if (!userManager.Users.Any())
      {
        var user = new AppUser
        {
          DisplayName = "Trinh",
          Email = "trinhdinh@email.com",
          UserName = "trinhdinh",
          Address = new Address
          {
            FirstName = "Trinh",
            LastName = "Dinh",
            Street = "854 Ta Quang Buu, district 8",
            City = "HCM",
            State = "Viet Nam",
            ZipCode = "70000"
          }
        };
        await userManager.CreateAsync(user, "Trinh123@");
      }
    }
  }
}