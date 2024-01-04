using Desafio.Business.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Desafio.Business.Interfaces
{
    public interface IRoleRepository: IDisposable
    {
        Task<IEnumerable<Role>> GetAllRoles();
        Task<Role?> GetRoleById(int? roleId);
    }
}
