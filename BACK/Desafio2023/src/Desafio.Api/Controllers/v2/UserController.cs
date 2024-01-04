using Asp.Versioning;
using Desafio.Api.ViewModel;
using Desafio.Business.Interfaces;
using Desafio.Business.Models.Request;
using Microsoft.AspNetCore.Mvc;

namespace Desafio.Api.Controllers
{
    [ApiVersion("2.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly INotification _notification;

        public UserController(IUserService userService, INotification notification)
        {
            _userService = userService;
            _notification = notification;
        }

        private IActionResult HandleResult(bool hasNotification, object? response)
        {
            if (hasNotification)
            {
                return BadRequest(_notification.GetNotifications());
            }

            return Ok(response);
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetUserById(Guid userId, Guid currentUserId)
        {
            var user = await _userService.GetUserById(userId, currentUserId);

            return HandleResult(_notification.HasNotification(), user);
        }

        [HttpGet("list-users")]
        public async Task<IActionResult> GetUserByRoleId([FromQuery] int? roleId, [FromQuery] Guid currentUserId)
        {
            var users = await _userService.GetUsersByRoleId(roleId, currentUserId);

            return HandleResult(_notification.HasNotification(), users);
        }

        [HttpPost("user")]
        public async Task<IActionResult> InsertUser([FromBody] UserRequest user, Guid currentUserId)
        {
            await _userService.InsertUser(user, currentUserId);

            return HandleResult(_notification.HasNotification(),null);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginViewModel user)
        {
            var userId = await _userService.LoginUser(user);

            return HandleResult(_notification.HasNotification(), userId);
        }

        [HttpPut("user-edit/{userId}")]
        public async Task<IActionResult> EditUser([FromBody] UserEditRequest user, Guid userId, Guid currentUserId)
        {
            await _userService.PutUser(user, userId, currentUserId);

            return HandleResult(_notification.HasNotification(), null);

        }
    }
}
