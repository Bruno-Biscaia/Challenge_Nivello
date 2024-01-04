using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Desafio.Business.Models.Request
{
    public class UserEditRequest
    {
        public string FullName { get; set; }
        public int RoleId { get; set; }
    }
}
