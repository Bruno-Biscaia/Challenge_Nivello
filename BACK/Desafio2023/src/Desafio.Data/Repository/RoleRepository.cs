using Desafio.Business.Interfaces;
using Desafio.Business.Models;
using Desafio.Data.Context;
using Microsoft.AspNetCore.Connections;
using Microsoft.EntityFrameworkCore;

namespace Desafio.Data.Repository
{
    public class RoleRepository : IRoleRepository, IDisposable
    {
        private readonly MyDbContext _context;

        public RoleRepository(MyDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Role>> GetAllRoles()
        {
          return await _context.Roles.ToListAsync();
        }

        public async Task<Role?> GetRoleById(int? roleId)
        {
            return await _context.Roles.FirstOrDefaultAsync(x => x.Id == roleId);
        }
      
        private bool disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
                disposed = true;
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        ~RoleRepository()
        {
            Dispose(false);
        }
    }
}

