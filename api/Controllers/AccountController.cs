using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using api.DAO;
using api.DTO;
using api.Entities.Identity;
using api.Exceptions;
using api.Extensions;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;

namespace api.Controllers
{
	[Route("api/[controller]")]
	public class AccountController : ControllerBase
	{
		private readonly UserManager<AppUser> _userManager;
		private readonly SignInManager<AppUser> _signInManager;
		private readonly IConfiguration _config;
		private readonly SymmetricSecurityKey _key;
		private readonly IMapper _mapper;
		public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, IConfiguration config,
				IMapper mapper)
		{
			_mapper = mapper;
			_signInManager = signInManager;
			_userManager = userManager;
			_config = config;
			_key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Token:Key"]));
		}

		[Authorize]
		[HttpGet]
		public async Task<ActionResult<ReturnUser>> GetCurrentUser()
		{
			var user = await _userManager.FindByEmailFromClaimsPrincipal(User);

			return new ReturnUser
			{
				Email = user.Email,
				Token = GetToken(user),
				DisplayName = user.DisplayName
			};
		}

		[HttpPost("login")]
		public async Task<ActionResult<ReturnUser>> Login(ReturnLogin ReturnLogin)
		{
			var user = await _userManager.FindByEmailAsync(ReturnLogin.Email);

			if (user == null) return Unauthorized(new ErrorResponse(401));

			var result = await _signInManager.CheckPasswordSignInAsync(user, ReturnLogin.Password, false);

			if (!result.Succeeded) return Unauthorized(new ErrorResponse(401));

			return new ReturnUser
			{
				Email = user.Email,
				Token = GetToken(user),
				DisplayName = user.DisplayName
			};
		}

		[HttpPost("register")]
		public async Task<ActionResult<ReturnUser>> Register(ReturnRegister ReturnRegister)
		{
			if (CheckEmailExistsAsync(ReturnRegister.Email).Result.Value)
			{
				return new BadRequestObjectResult(new ErrorResponse(201));
			}

			var user = new AppUser
			{
				DisplayName = ReturnRegister.DisplayName,
				Email = ReturnRegister.Email,
				UserName = ReturnRegister.Email
			};

			var result = await _userManager.CreateAsync(user, ReturnRegister.Password);

			if (!result.Succeeded) return BadRequest(new ErrorResponse(400));

			return new ReturnUser
			{
				DisplayName = user.DisplayName,
				Token = GetToken(user),
				Email = user.Email
			};
		}

		[HttpGet("emailexists")]
		public async Task<ActionResult<bool>> CheckEmailExistsAsync([FromQuery] string email)
		{
			return await _userManager.FindByEmailAsync(email) != null;
		}

		[Authorize]
		[HttpGet("address")]
		public async Task<ActionResult<ReturnAddress>> GetUserAddress()
		{
			var user = await _userManager.FindUserByClaimsPrincipleWithAddress(User);

			return _mapper.Map<Address, ReturnAddress>(user.Address);
		}

		[Authorize]
		[HttpPut("address")]
		public async Task<ActionResult<ReturnAddress>> UpdateUserAddress(ReturnAddress address)
		{
			var user = await _userManager.FindUserByClaimsPrincipleWithAddress(User);

			user.Address = _mapper.Map<ReturnAddress, Address>(address);

			var result = await _userManager.UpdateAsync(user);

			if (result.Succeeded) return Ok(_mapper.Map<ReturnAddress>(user.Address));

			return BadRequest("Problem updating the user");
		}

		public string GetToken(AppUser user)
		{
			var claims = new List<Claim>
						{
								new Claim(ClaimTypes.Email, user.Email),
								new Claim(ClaimTypes.GivenName, user.DisplayName)
						};

			var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

			var tokenDescriptor = new SecurityTokenDescriptor
			{
				Subject = new ClaimsIdentity(claims),
				Expires = DateTime.Now.AddDays(7),
				SigningCredentials = creds,
				Issuer = _config["Token:Issuer"]
			};

			var tokenHandler = new JwtSecurityTokenHandler();

			var token = tokenHandler.CreateToken(tokenDescriptor);

			return tokenHandler.WriteToken(token);
		}
	}
}