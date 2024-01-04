using Desafio.Business.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Desafio.Business.Interfaces
{
    public interface IUserRepository : IDisposable
    {
        Task<User?> GetUserById(Guid id);
        Task<User?> GetUserByFullNameOrEmail(string fullNameOrEmail);
        Task<IEnumerable<User>> GetUsersByRoleId(int? roleId);
        Task InsertUser(User user);
        Task PutUser(User user);
        Task<bool> ExistsUser(Guid id);
        Task<bool> ExistsUserByNameOrEmail(string fullNameOrEmail);
        Task<User?> GetUserByEmail(string email);
    }
}
