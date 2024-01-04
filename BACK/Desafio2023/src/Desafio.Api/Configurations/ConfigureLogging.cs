using Serilog;

namespace Desafio.Api.Configurations
{
    public static class ConfigureLogging
    {
        public static IServiceCollection LoggingConfig(this IServiceCollection services)
        {
            services.AddLogging(loggingBuilder =>
            {
                loggingBuilder.AddSerilog(new LoggerConfiguration()
                    .WriteTo.Console()
                    .WriteTo.File("C:\\Users\\Graff\\source\\repos\\desafio2023\\BACK\\Desafio2023\\logs\\desafio.txt", rollingInterval: RollingInterval.Day)
                    .MinimumLevel.Information()
                    .CreateLogger()); ;
            });

            return services;
        }
    }
}
