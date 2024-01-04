using Desafio.Api.ViewModel;
using Desafio.Business.Models;
using Desafio.Business.Models.Request;
using Microsoft.AspNetCore.Mvc;

namespace Desafio.Business.Interfaces
{
    public interface IUserService
    {
        Task<UserViewModel?> GetUserById(Guid userId, Guid currentUserId);
        Task<IEnumerable<UserViewModel?>> GetUsersByRoleId(int? roleId, Guid currentUserId);
        Task<bool> InsertUser(UserRequest user, Guid currentUserId);
        Task<Guid> LoginUser(UserLoginViewModel userLogin);
        Task<bool> PutUser(UserEditRequest userEdit, Guid userId, Guid currentUserId);
    }
}
