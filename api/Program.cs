using System.Text;
using api.DAO;
using api.Data;
using api.Entities.Identity;
using api.Exceptions;
using api.Helpers;
using api.Middleware;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using StackExchange.Redis;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddDbContext<ApplicationDbContext>(option => option.UseSqlServer(builder.Configuration.GetConnectionString("AnyConnectionName")));
builder.Services.AddSingleton<IConnectionMultiplexer>(_ =>
{
  // var redisUrl = ConfigurationOptions.Parse(builder.Configuration.GetConnectionString("Redis"), true);
  return ConnectionMultiplexer.Connect("localhost");
});


// var multiplexer = ConnectionMultiplexer.Connect("172.0.0.1:6379");
// builder.Services.AddSingleton<IConnectionMultiplexer>(multiplexer);
builder.Services.AddControllers();

/**
 * Identity Section
 */
builder.Services
    .AddIdentityCore<AppUser>(option =>
    {
      option.Password.RequireNonAlphanumeric = false;
      option.Password.RequireDigit = false;
      option.Password.RequireLowercase = false;
      option.Password.RequireUppercase = false;
    })
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddSignInManager<SignInManager<AppUser>>();
// .AddDefaultTokenProviders();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
    {
      options.TokenValidationParameters = new TokenValidationParameters
      {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Token:Key"])),
        ValidIssuer = builder.Configuration["Token:Issuer"],
        ValidateIssuer = true,
        ValidateAudience = false
      };
    }); ;
builder.Services.AddAuthorization();
// builder.Services.AddAuthentication(options =>
// {
//   options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
//   options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
//   options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
// }).AddJwtBearer(options =>
// {
//   options.SaveToken = true;
//   options.RequireHttpsMetadata = false;
//   options.TokenValidationParameters = new TokenValidationParameters()
//   {
//     ValidateIssuer = true,
//     ValidateAudience = true,
//     ValidAudience = builder.Configuration["JWT:ValidAudience"],
//     ValidIssuer = builder.Configuration["JWT:ValidIssuer"],
//     IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Secret"]))
//   };
// });
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.Configure<ApiBehaviorOptions>(options =>
{
  options.InvalidModelStateResponseFactory = actionContext =>
  {
    var errors = actionContext.ModelState
          .Where(e => e.Value.Errors.Count > 0)
          .SelectMany(x => x.Value.Errors)
          .Select(x => x.ErrorMessage);

    var errorResponse = new ValidateInputErrorResponse(400);
    errorResponse.Errors = errors;
    return new BadRequestObjectResult(errorResponse);
  };
});

builder.Services.AddCors(options =>
{
  options.AddDefaultPolicy(policy =>
  {
    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200", "https://localhost:4200");
  });
});

builder.Services.AddAutoMapper(typeof(MyAutoMapper));
// Khai bao service cho dependency injection
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IBasketRepository, BasketRepository>();

var app = builder.Build();
app.UseMiddleware<ServerErrorExceptionMiddle>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}
app.UseStatusCodePagesWithReExecute("/errors/{0}");
// app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseCors();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();


AppDbInitializer.Seed(app);

app.Run();
