// using System;
// using System.Collections.Generic;
// using System.Diagnostics;
// using System.Linq;
// using System.Text;
// using System.Text.RegularExpressions;
// using System.Threading.Tasks;
// using api.Data;
// using api.Entities;
// using api.Helpers;
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.EntityFrameworkCore;
// using Microsoft.Extensions.Logging;

// namespace api.Controllers
// {
//   [Route("api/[controller]")]
//   public class UsersController : ControllerBase
//   {
//     private readonly ApplicationDbContext _Db;
//     public UsersController(ApplicationDbContext Db)
//     {
//       _Db = Db;
//     }

//     [HttpPost("authenticate")]
//     public async Task<IActionResult> Authenticate([FromBody] User userObj)
//     {
//       if (userObj == null)
//         return BadRequest();

//       var user = await _Db.Users
//           .FirstOrDefaultAsync(x => x.Username == userObj.Username && x.Password == userObj.Password);

//       if (user == null)
//         return NotFound(new { Message = "User not found!" });

//       if (!PasswordHasher.VerifyPassword(userObj.Password, user.Password))
//       {
//         return BadRequest(new { Message = "Password is Incorrect" });
//       }

//       // user.Token = CreateJwt(user);

//       return Ok(new
//       {
//         // Token = user.Token,
//         Message = "Login Success!"
//       });
//     }

//     [HttpPost("register")]
//     public async Task<IActionResult> AddUser([FromBody] User userObj)
//     {

//       if (userObj == null)
//         return BadRequest();

//       // check email
//       if (await CheckEmailExistAsync(userObj.Email))
//         return BadRequest(new { Message = "Email Already Exist" });

//       //check username
//       if (await CheckUsernameExistAsync(userObj.Username))
//         return BadRequest(new { Message = "Username Already Exist" });

//       var passMessage = CheckPasswordStrength(userObj.Password);
//       if (!string.IsNullOrEmpty(passMessage))
//         return BadRequest(new { Message = passMessage.ToString() });

//       userObj.Password = PasswordHasher.HashPassword(userObj.Password);
//       userObj.RoleId = 3;
//       userObj.Token = "";
//       await _Db.AddAsync(userObj);
//       await _Db.SaveChangesAsync();
//       return Ok(new
//       {
//         Status = 200,
//         Message = "User Added!"
//       });
//     }

//     private Task<bool> CheckEmailExistAsync(string? email)
//         => _Db.Users.AnyAsync(x => x.Email == email);

//     private Task<bool> CheckUsernameExistAsync(string? username)
//         => _Db.Users.AnyAsync(x => x.Email == username);

//     private static string CheckPasswordStrength(string pass)
//     {
//       StringBuilder sb = new StringBuilder();
//       if (pass.Length < 9)
//         sb.Append("Minimum password length should be 8" + Environment.NewLine);
//       if (!(Regex.IsMatch(pass, "[a-z]") && Regex.IsMatch(pass, "[A-Z]") && Regex.IsMatch(pass, "[0-9]")))
//         sb.Append("Password should be AlphaNumeric" + Environment.NewLine);
//       if (!Regex.IsMatch(pass, "[<,>,@,!,#,$,%,^,&,*,(,),_,+,\\[,\\],{,},?,:,;,|,',\\,.,/,~,`,-,=]"))
//         sb.Append("Password should contain special charcter" + Environment.NewLine);
//       return sb.ToString();
//     }
//   }
// }