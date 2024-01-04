using Desafio.Business.Interfaces;
using Desafio.Business.Models;
using Microsoft.Extensions.Logging;

namespace Desafio.Business.Services
{
    public class RoleService : BaseService, IRoleService
    {
        private readonly IRoleRepository _roleRepository;
        private readonly IUserRepository _userRepository;
        private readonly ILogger<RoleService> _logger;
        public RoleService(INotification notification, 
            IRoleRepository roleRepository, 
            IUserRepository userRepository,
            ILogger<RoleService> logger) : base(notification)
        {
            _roleRepository = roleRepository;
            _userRepository = userRepository;
            _logger = logger;
        }

        public async Task<bool> AssignRoleToUser(Guid userId, Guid currentUserId, int roleId)
        {
            try
            {
                var userToAssign = await _userRepository.GetUserById(userId);
                var userLogged = await _userRepository.GetUserById(currentUserId);

                var role = await _roleRepository.GetRoleById(roleId);

                if (!ValidateAssignRoleToUser(userToAssign, userLogged, roleId))
                    return false;

                if (role is null)
                {
                    Notification("Role não encontrada!");
                    return false;
                }

                userToAssign.Role = role;

                await _userRepository.PutUser(userToAssign);

                _logger.LogInformation($"Role vinculada com sucesso!. Usuário: {userToAssign.FullName} - Role: {role.RoleName}");

                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Erro ao vincular role! {ex.Message} - UserId: {userId}, roleId: {roleId}");
                throw new ApplicationException("Erro - Vinculo role", ex);
            }

        }

        private bool ValidateAssignRoleToUser(User? userToAssign, User? userLogged, int roleId)
        {
            if (userToAssign is null)
            {
                Notification("Usuário não encontrado");
                return false;
            }

            if (userLogged is null)
            {
                Notification("Usuário logado não encontrado");
                return false;
            }

            if (userToAssign.RoleId is not null)
            {
                Notification("O Usuário informado ja possui uma role!");
                return false;
            }

            if (roleId >= userLogged.RoleId)
            {
                Notification("A role do usuário deve menor que a informada!");
                return false;
            }

            return true;
        }

        public void Dispose()
        {
            _roleRepository?.Dispose();
        }

        public async Task<IEnumerable<Role>> GetAllRoles()
        {
            return await _roleRepository.GetAllRoles();
        }
    }
}
