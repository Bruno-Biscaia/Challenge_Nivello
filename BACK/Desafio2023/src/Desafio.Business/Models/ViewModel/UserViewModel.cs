using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using Desafio.Business.Models;

namespace Desafio.Api.ViewModel
{
    public class UserViewModel
    {
        public Guid Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public int RoleId { get; set; }
        public string RoleName { get; set; }
    }

}
