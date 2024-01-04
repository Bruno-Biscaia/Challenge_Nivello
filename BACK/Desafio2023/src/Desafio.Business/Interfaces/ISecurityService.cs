using Desafio.Api.ViewModel;
using Desafio.Business.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Desafio.Business.Interfaces
{
    public interface ISecurityService
    {
        Task<bool> VerifyPassword(string password, User user);
        Task<string> EncryptPassword(string password);
    }
}
