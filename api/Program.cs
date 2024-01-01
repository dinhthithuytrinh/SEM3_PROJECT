using api.DAO;
using api.Data;
using api.Exceptions;
using api.Helpers;
using api.Middleware;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddDbContext<ApplicationDbContext>(option => option.UseSqlServer(builder.Configuration.GetConnectionString("AnyConnectionName")));

builder.Services.AddControllers();
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

app.UseAuthorization();

app.MapControllers();


AppDbInitializer.Seed(app);

app.Run();
