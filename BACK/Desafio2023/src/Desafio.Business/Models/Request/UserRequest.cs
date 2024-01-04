using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Desafio.Business.Models.Request
{
    public class UserRequest
    {     
        public string FullName { get; set; }
        public string Email { get; set; }
        public int? RoleId { get; set; }
        public string MainPassword { get; set; }

    }
}
