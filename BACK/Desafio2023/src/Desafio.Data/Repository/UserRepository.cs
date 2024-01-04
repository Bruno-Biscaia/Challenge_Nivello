using Desafio.Business.Interfaces;
using Desafio.Business.Models;
using Desafio.Data.Context;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace Desafio.Data.Repository
{
    public class UserRepository : IUserRepository, IDisposable
    {
        private readonly MyDbContext _context;

        public UserRepository(MyDbContext context)
        {
            _context = context;
        }

        public async Task<User?> GetUserById(Guid id)
        {
            return await _context.Users
               .Include(x => x.Role)
               .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<User?> GetUserByFullNameOrEmail(string fullNameOrEmail)
        {
            return await _context.Users
                .Include(x => x.Role)
                .FirstOrDefaultAsync(x => x.FullName == fullNameOrEmail || x.Email == fullNameOrEmail);
        }

        public async Task<IEnumerable<User>> GetUsersByRoleId(int? roleId)
        {
            return await _context.Users.AsNoTracking()
                .Include(x => x.Role)
                .Where(x => roleId == null || x.RoleId == roleId)
                .ToListAsync();
        }

        public async Task InsertUser(User user)
        {
            _context.Add(user);
            await _context.SaveChangesAsync();
        }

        public async Task PutUser(User user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();          
        }

        public async Task<bool> ExistsUser(Guid id)
        {
            return await _context.Users.AsNoTracking()
                .AnyAsync(x => x.Id == id);
        }

        public async Task<bool> ExistsUserByNameOrEmail(string fullNameOrEmail)
        {
            return await _context.Users
                .Include(x => x.Role)
                .AnyAsync(x => x.FullName == fullNameOrEmail || x.Email == fullNameOrEmail);
        }

        public async Task<User?> GetUserByEmail(string email)
        {
            return await _context.Users
                .Include(x => x.Role)
                .FirstOrDefaultAsync(x => x.Email == email);
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

        ~UserRepository()
        {
            Dispose(false);
        }
    }
}

