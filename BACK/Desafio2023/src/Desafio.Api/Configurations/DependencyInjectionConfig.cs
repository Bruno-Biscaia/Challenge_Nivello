using Desafio.Business.Interfaces;
using Desafio.Business.Notificações;
using Desafio.Business.Services;
using Desafio.Data.Context;
using Desafio.Data.Repository;

namespace Desafio.Api.Configurations
{
    public static class DependencyInjectionConfig
    {
        public static IServiceCollection ResolveDepencies(this IServiceCollection services)
        {
            services.AddScoped<MyDbContext>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IRoleRepository, RoleRepository>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IRoleService, RoleService>();
            services.AddScoped<INotification, Notifier>();
            services.AddScoped<ISecurityService, SecurityService>();

            return services;
        }
    }
}
