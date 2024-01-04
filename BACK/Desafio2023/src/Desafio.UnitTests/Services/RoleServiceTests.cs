using Desafio.Business.Interfaces;
using Desafio.Business.Models;
using Desafio.Business.Services;
using FluentAssertions;
using Moq;
using Moq.AutoMock;
using Xunit;

namespace Desafio.UnitTests.Services
{
    public class RoleServiceTests
    {
        private readonly AutoMocker _mocker;
        private readonly IRoleService _roleService;
        public RoleServiceTests()
        {
            _mocker = new AutoMocker();
            _roleService = _mocker.CreateInstance<RoleService>();
        }

        [Theory(DisplayName = "Deve vincular role a um usuário que não possui com sucesso.")]
        [InlineData(1)]
        [InlineData(3)]
        [InlineData(4)]
        [InlineData(5)]
        [InlineData(6)]
        [InlineData(7)]
        public async Task AssignRoleToUser_ShouldAssingRoleBeTrue(int roleId)
        {
            var userToAssign = new User
            {
                FullName = "Teste",
                Email = "teste@gmail.com",
                MainPassword = "123456",
                RoleId = null
            };
            var userLogged = new User
            {
                FullName = "loggedUser",
                MainPassword = "123456",
                Email = "loggedUser@gmail.com",
                RoleId = roleId + 1
            };

            var userIdToAssign = Guid.NewGuid();
            var currentUserId = Guid.NewGuid();

            var userRepositoryMock = _mocker.GetMock<IUserRepository>();

            userRepositoryMock.SetupSequence(x => x.GetUserById(It.IsAny<Guid>()))
                .ReturnsAsync(userToAssign)
                .ReturnsAsync(userLogged);

            var roleRepositoryMock = _mocker.GetMock<IRoleRepository>();

            roleRepositoryMock.Setup(x => x.GetRoleById(It.Is<int>(x => (x >= 1 && x <= 7) && (x != 2))))
                .ReturnsAsync(new Role());

            var result = await _roleService.AssignRoleToUser(userIdToAssign, currentUserId, roleId);

            result.Should().BeTrue();

        }

        [Theory(DisplayName = "Não deve vincular role a um usuário.")]
        [InlineData(1)]
        [InlineData(3)]
        [InlineData(4)]
        [InlineData(5)]
        [InlineData(6)]
        [InlineData(7)]
        public async Task AssignRoleToUser_ShouldAssingRoleBeFalse(int roleId)
        {

            var userToAssign = new User
            {
                FullName = "Teste",
                Email = "teste@gmail.com",
                MainPassword = "123456",
                RoleId = null
            };
            var userLogged = new User
            {
                FullName = "loggedUser",
                MainPassword = "123456",
                Email = "loggedUser@gmail.com",
                RoleId = roleId - 1
            };

            var userIdToAssign = Guid.NewGuid();
            var currentUserId = Guid.NewGuid();

            var userRepositoryMock = _mocker.GetMock<IUserRepository>();

            userRepositoryMock.SetupSequence(x => x.GetUserById(It.IsAny<Guid>()))
                .ReturnsAsync(userToAssign)
                .ReturnsAsync(userLogged);

            var roleRepositoryMock = _mocker.GetMock<IRoleRepository>();

            roleRepositoryMock.Setup(x => x.GetRoleById(It.Is<int>(x => (x >= 1 && x <= 7) && (x != 2))))
                .ReturnsAsync(new Role());

            var result = await _roleService.AssignRoleToUser(userIdToAssign, currentUserId, roleId);

            result.Should().BeFalse();

        }
    }
}
