using Desafio.Business.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Desafio.Business.Interfaces
{
    public interface IRoleService : IDisposable
    {
        Task<IEnumerable<Role>> GetAllRoles();
        Task<bool> AssignRoleToUser(Guid userId, Guid currentUserId, int roleId);
    }
}
