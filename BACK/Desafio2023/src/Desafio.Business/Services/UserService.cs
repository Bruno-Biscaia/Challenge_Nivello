using AutoMapper;
using Desafio.Api.ViewModel;
using Desafio.Business.Interfaces;
using Desafio.Business.Models;
using Desafio.Business.Models.Request;
using Desafio.Business.Models.Validation;
using Desafio.Common.Utils;
using Microsoft.Extensions.Logging;

namespace Desafio.Business.Services
{
    public class UserService : BaseService, IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly INotification _notification;
        private readonly IRoleRepository _rolerepository;
        private readonly ISecurityService _securityService;
        private readonly ILogger <UserService> _logger;

        public UserService(INotification notification, 
             IUserRepository userRepository,
             IMapper mapper,
             IRoleRepository roleRepository,
             ISecurityService securityService,
             ILogger<UserService> logger) : base(notification)
        {
            _userRepository = userRepository;
             _mapper = mapper;
            _notification = notification;
            _rolerepository = roleRepository;
            _securityService = securityService;
            _logger = logger;
        }

        public async Task<UserViewModel?> GetUserById(Guid userId, Guid currentUserId)
        {
            var user = _mapper.Map<UserViewModel>(await _userRepository.GetUserById(userId));

            if(user is null)
            {
                Notification("Usuário não encontrado!");
                return user;
            }

            return user;
        }

        public async Task<IEnumerable<UserViewModel?>> GetUsersByRoleId(int? roleId, Guid currentUserId)
        {
            var users = _mapper.Map<IEnumerable<UserViewModel>>(await _userRepository.GetUsersByRoleId(roleId));
          
            if(users.Count() == 0)
            {
                Notification("Nenhum usuário encontrado!");
                return users;
            }

            return users;
        }

        public async Task<bool> InsertUser(UserRequest userModel, Guid currentUserId)
        {
            try
            {
                var user = _mapper.Map<User>(userModel);

                user.Email = EmailUtils.CleanEmail(userModel.Email);

                if (!ExecuteValidation(new UserValidation(), user))
                    return false;

                if ((await _userRepository.ExistsUserByNameOrEmail(user.FullName)))
                {
                    Notification("O nome informado ja existe!");
                    return false;
                }

                if ((await _userRepository.ExistsUserByNameOrEmail(user.Email)))
                {
                    Notification("O email informado ja existe!");
                    return false;
                }

                var userLogged = await _userRepository.GetUserById(currentUserId);
                var role = await _rolerepository.GetRoleById(user.RoleId);

                if (!(ValidateInsertUser(userLogged, user, role)))
                    return false;

                var passwordHash = await _securityService.EncryptPassword(user.MainPassword);

                user.MainPassword = passwordHash;

                await _userRepository.InsertUser(user);

                _logger.LogInformation($"Usuário {user.FullName} foi criado com sucesso!");
            }
            catch (Exception ex)
            {
                _logger.LogError($"Erro ao tentar inserir usuário. Erro: {ex.Message}");
                throw new ApplicationException("Erro - Inserir usuário", ex);
            }
            return true;
        }

        public async Task<Guid> LoginUser(UserLoginViewModel userLogin)
        {
            try
            {
                var user = await _userRepository.GetUserByEmail(userLogin.Email);

                if (user is null)
                {
                    Notification("Usuário não encontrado");
                    return Guid.Empty;
                }

                if (!(await _securityService.VerifyPassword(userLogin.MainPassword, user)))
                {
                    Notification("A senha esta incorreta!");
                    return Guid.Empty;
                }
                return user.Id;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Erro ao realizar login. Erro: {ex.Message} - {userLogin.Email}");
                throw new ApplicationException("Erro - Login", ex);
            }

        }

        public async Task<bool> PutUser(UserEditRequest userEdit, Guid userId, Guid currentUserId)
        {
            try
            {
                if (!(await ValidateEditUser(userId, userEdit, currentUserId)))
                    return false;

                var user = await _userRepository.GetUserById(userId);
                var role = await _rolerepository.GetRoleById(userEdit.RoleId);

                if (role is null)
                {
                    Notification("Role não encontrada!");
                    return false;
                }

                user.Role = role;
                user.FullName = userEdit.FullName;

                await _userRepository.PutUser(user);

                _logger.LogInformation($"Usuário {userEdit.FullName} foi editado com sucesso!");

            }
            catch (Exception ex)
            {
                _logger.LogError($"Erro ao tentar editar usuário. Erro: {ex.Message}");
                throw new ApplicationException("Erro - Ediçao", ex);
            }
            return true;
        }

        private async Task<bool> ValidateEditUser(Guid userId, UserEditRequest userToEdit, Guid currentUserId)
        {
            var userLogged = await _userRepository.GetUserById(currentUserId);
            var userEditRequest = await _userRepository.GetUserById(userId);

            if (!ExecuteEditUserValidation(new UserEditValidation(), userToEdit))
                return false;
          
            if (userToEdit.FullName != userEditRequest.FullName 
                && (await _userRepository.ExistsUserByNameOrEmail(userToEdit.FullName)) 
                && userToEdit.RoleId != userEditRequest.RoleId)
            {
                Notification("Já existe um usuário com o nome informado!");
                return false;
            }

            if (!(await _userRepository.ExistsUser(userId)))
            {
                Notification("Usuário para edição não encontrado!");
                return false;
            }

            if(userLogged is null)
            {
                Notification("Usuário logado não encontrado!");
                return false;
            }

            if (userLogged.Id == userId && userToEdit.RoleId != userLogged.RoleId)
            {
                Notification("O usuário não pode editar sua propria role!");
                return false;
            }
         
            if (userLogged?.RoleId <= userToEdit.RoleId && userLogged.Id != userId)
            {
                Notification("A role do usuário deve menor que a informada!");
                return false;
            }
            return true;
        }


        private bool ValidateInsertUser(User userLogged, User userInsert, Role role)
        {
            if (userLogged is null)
            {
                Notification("Usuário logado não encontrado!");
                return false;
            }

            if (userInsert.RoleId is not null && role is null)
            {
                Notification("A role informada não existe!");
                return false;
            }

            if (userInsert.RoleId > 0 && userInsert.RoleId >= userLogged.RoleId)
            {
                Notification("A role do usuário deve ser menor que a informada!");
                return false;
            }

            return true;
        }

        public void Dispose()
        {
            _userRepository?.Dispose();
            _rolerepository?.Dispose();
        }

    }
}
