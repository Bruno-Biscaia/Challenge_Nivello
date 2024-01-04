using Desafio.Api.ViewModel;
using Desafio.Business.Interfaces;
using Desafio.Business.Models;

namespace Desafio.Business.Services
{
    public class SecurityService : ISecurityService
    {
        public Task<string> EncryptPassword(string password)
        {
            var hashPassword = BCrypt.Net.BCrypt.HashPassword(password);
            return Task.FromResult(hashPassword.ToString());
        }

        public Task<bool> VerifyPassword(string password, User user)
        {
            var validPassword = BCrypt.Net.BCrypt.Verify(password, user.MainPassword);
            return Task.FromResult(validPassword);
        }
    }
}
