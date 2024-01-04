using Desafio.Api.SwaggerConfig;

namespace Desafio.Api.Configurations
{
    public static class SwaggerConfig
    {
        public static IServiceCollection ConfigurationSwagger(this IServiceCollection services)
        {
            services.AddSwaggerGen(x =>
            {
                x.OperationFilter<SwaggerDefaultValues>();
            });

            services.AddApiVersioning().AddMvc()
                .AddApiExplorer(setup =>
                {
                    setup.GroupNameFormat = "'v'VVV";
                    setup.SubstituteApiVersionInUrl = true;
                });

            services.ConfigureOptions<ConfigureSwagger>();

            return services;
        }
    }
}
