using Asp.Versioning.ApiExplorer;
using Desafio.Api.AutoMapper;
using Desafio.Api.Configurations;
using Desafio.Api.SwaggerConfig;
using Desafio.Data.Context;
using Microsoft.EntityFrameworkCore;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddDbContext<MyDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddAutoMapper(typeof(MapperConfig));
builder.Services.ResolveDepencies();
builder.Services.ConfigurationSwagger();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.LoggingConfig();

var app = builder.Build();

if (app.Environment.IsDevelopment() || app.Environment.IsStaging())
{
    app.UseSwagger();
    app.UseSwaggerUI( opt => {

        var version = app.Services.GetRequiredService<IApiVersionDescriptionProvider>();

        foreach (var description in version.ApiVersionDescriptions)
        {
            opt.SwaggerEndpoint($"/swagger/{description.GroupName}/swagger.json",$"DesafioApi Nivello - {description.GroupName.ToUpper()}");
        }
        
    });
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
                                                                                                                                                            
app.UseCors(builder =>
{
    builder.AllowAnyOrigin()
           .AllowAnyHeader()
           .AllowAnyMethod();
});

app.Run();
