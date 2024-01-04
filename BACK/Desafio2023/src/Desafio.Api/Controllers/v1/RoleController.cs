using Asp.Versioning;
using Desafio.Business.Interfaces;
using Desafio.Business.Models;
using Desafio.Business.Notificações;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace Desafio.Api.Controllers.v1
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly IRoleService _roleService;
        private readonly INotification _notification;
        public RoleController(IRoleService roleService, INotification notification)
        {
            _roleService = roleService;
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

        [HttpGet("roles")]
        public async Task<IActionResult> GetAllRoles()
        {
            var role = await _roleService.GetAllRoles();

            return HandleResult(_notification.HasNotification(), role);
        }

        [HttpPost("assignRoleToUser")]
        public async Task<IActionResult> AssingnRoleToUser(Guid userId, Guid currentUserId, int roleId)
        {
            await _roleService.AssignRoleToUser(userId, currentUserId, roleId);

            return HandleResult(_notification.HasNotification(), null);
        }
    }
}
