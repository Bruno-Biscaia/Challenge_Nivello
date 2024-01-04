using AutoMapper;
using Desafio.Api.ViewModel;
using Desafio.Business.Interfaces;
using Desafio.Business.Models;
using Desafio.Business.Models.Request;
using Desafio.Business.Services;
using FluentAssertions;
using Moq;
using Moq.AutoMock;
using Xunit;

namespace Desafio.UnitTests.Services
{
    public class UserServiceTests
    {
        private readonly AutoMocker _mocker;
        private readonly IUserService _userService;
        private readonly IRoleService _roleService;
        public UserServiceTests()
        {
            _mocker = new AutoMocker();
            _userService = _mocker.CreateInstance<UserService>();
            _roleService = _mocker.CreateInstance<RoleService>();
        }

        [Fact(DisplayName = "Deve inserir um usuário novo com sucesso.")]
        public async Task InsertUser_WithValidModel_ShouldInsertUser()
        {
            var userRequest = new UserRequest
            {
                FullName = "Mock Teste",
                MainPassword = "123456",
                Email = "mockTeste@gmail.com",
                RoleId = 6
            };

            var loggedUser = new User
            {
                FullName = "loggedUser",
                MainPassword = "123456",
                Email = "loggedUser@gmail.com",
                RoleId = 7
            };

            var role = new Role
            {
                Id = 7,
                RoleName = "Test",
            };

            var currentUserId = Guid.NewGuid();

            var userRepositoryMock = _mocker.GetMock<IUserRepository>();

            userRepositoryMock.Setup(x => x.ExistsUserByNameOrEmail(It.IsAny<string>()))
                 .ReturnsAsync(false);

            userRepositoryMock.Setup(x => x.GetUserById(It.IsAny<Guid>()))
                .ReturnsAsync(loggedUser);

            var roleRepositoryMock = _mocker.GetMock<IRoleRepository>();

            roleRepositoryMock.Setup(x => x.GetRoleById(It.IsAny<int>()))
            .ReturnsAsync(role);

            var securityServiceMock = _mocker.GetMock<ISecurityService>();

            securityServiceMock.Setup(x => x.EncryptPassword(It.IsAny<string>()))
                .ReturnsAsync("hashedPassword");

            var mockMapper = _mocker.GetMock<IMapper>();
            mockMapper.Setup(m => m.Map<User>(It.IsAny<UserRequest>()))
              .Returns((UserRequest source) => new User
              {
                  FullName = source.FullName,
                  MainPassword = source.MainPassword,
                  Email = source.Email,
                  RoleId = source.RoleId
              });

            var results = await _userService.InsertUser(userRequest, currentUserId);

            results.Should().BeTrue();
        }

        [Fact(DisplayName = "Deve editar um usuário novo com sucesso")]
        public async Task EditUser_WithValidModel_ShouldEditUserUser()
        {
            var userEditRequest = new UserEditRequest
            {
                FullName = "TesteEdit",
                RoleId = 5
            };

            var UserIdToEdit = Guid.NewGuid();
            var currentUserId = Guid.NewGuid();

            var userRepositoryMock = _mocker.GetMock<IUserRepository>();

            userRepositoryMock.SetupSequence(x => x.GetUserById(It.IsAny<Guid>()))
                 .ReturnsAsync(new User
                 {
                     FullName = "loggedUser",
                     MainPassword = "123456",
                     Email = "loggedUser@gmail.com",
                     RoleId = 7
                 })
                 .ReturnsAsync(new User())
                 .ReturnsAsync(new User());

            userRepositoryMock.Setup(x => x.ExistsUser(It.IsAny<Guid>()))
                .ReturnsAsync(true);

            var roleRepository = _mocker.GetMock<IRoleRepository>();

            roleRepository.Setup(x => x.GetRoleById(It.IsAny<int>()))
                .ReturnsAsync(new Role());

            var result = await _userService.PutUser(userEditRequest, UserIdToEdit, currentUserId);

            result.Should().BeTrue();

        }

        [Theory(DisplayName = "Deve editar apenas o nome caso o usuario a ser editado seja o logado.")]
        [InlineData(5,5)]
        public async Task EditUser_WithValidModel_ShouldEditOnlyNameForLoggedInUser(int roleIdRequest, int roleIdUserLogged)
        {
            var userEditRequest = new UserEditRequest
            {
                FullName = "NewName",
                RoleId = roleIdRequest
            };

            var UserIdToEdit = Guid.NewGuid();
            var currentUserId = UserIdToEdit;

            var sameUser = new User
            {
                Id = currentUserId,
                FullName = "OldName",
                MainPassword = "123456",
                Email = "OldName@gmail.com",
                RoleId = roleIdUserLogged
            };
         
            var userRepositoryMock = _mocker.GetMock<IUserRepository>();

            userRepositoryMock.SetupSequence(x => x.GetUserById(It.IsAny<Guid>()))
                 .ReturnsAsync(sameUser)
                 .ReturnsAsync(sameUser)
                 .ReturnsAsync(sameUser);

            userRepositoryMock.Setup(x => x.ExistsUser(It.IsAny<Guid>()))
                .ReturnsAsync(true);

            var roleRepository = _mocker.GetMock<IRoleRepository>();

            roleRepository.Setup(x => x.GetRoleById(It.IsAny<int>()))
                .ReturnsAsync(new Role());

            var result = await _userService.PutUser(userEditRequest, UserIdToEdit, currentUserId);

            result.Should().BeTrue();

        }
        [Theory(DisplayName = "Erro ao se auto editar e tentar mudar a sua propra role.")]
        [InlineData(6,5)]
        public async Task EditUser_WithValidModel_ShouldFailToEditRoleForLoggedInUser(int roleIdRequest, int roleIdUserLogged)
        {
            var userEditRequest = new UserEditRequest
            {
                FullName = "NewName",
                RoleId = roleIdRequest
            };

            var UserIdToEdit = Guid.NewGuid();
            var currentUserId = UserIdToEdit;

            var sameUser = new User
            {
                Id = currentUserId,
                FullName = "OldName",
                MainPassword = "123456",
                Email = "OldName@gmail.com",
                RoleId = roleIdUserLogged
            };

            var userRepositoryMock = _mocker.GetMock<IUserRepository>();

            userRepositoryMock.SetupSequence(x => x.GetUserById(It.IsAny<Guid>()))
                 .ReturnsAsync(sameUser)
                 .ReturnsAsync(sameUser);

            userRepositoryMock.Setup(x => x.ExistsUser(It.IsAny<Guid>()))
                .ReturnsAsync(true);

            var roleRepository = _mocker.GetMock<IRoleRepository>();

            roleRepository.Setup(x => x.GetRoleById(It.IsAny<int>()))
                .ReturnsAsync(new Role());

            var result = await _userService.PutUser(userEditRequest, UserIdToEdit, currentUserId);

            result.Should().BeFalse();

        }

        [Fact(DisplayName = "Deve validar com sucesso as credenciais do usuário ao tentar logar.")]
        public async Task Login_WithValidCredentials_ShouldAuthenticateUser()
        {
            var userLogin = new UserLoginViewModel
            {
                Email = "teste@gmail.com",
                MainPassword = "123456"
            };

            Guid returnGuid = Guid.NewGuid();

            var userRepositoryMock = _mocker.GetMock<IUserRepository>();

            userRepositoryMock.Setup(x => x.GetUserByEmail(It.IsAny<string>()))
                .ReturnsAsync(new User
                {
                    Id = returnGuid,
                    FullName = "Teste",
                    Email = "teste@gmail.com",
                    MainPassword = "123456"
                });

            var securityServiceRepository = _mocker.GetMock<ISecurityService>();

            securityServiceRepository.Setup(x => x.VerifyPassword(It.IsAny<string>(), It.IsAny<User>()))
                .ReturnsAsync(true);

            var results = await _userService.LoginUser(userLogin);

            results.Should().NotBeEmpty().And.Be(returnGuid);

        }       
    }
}