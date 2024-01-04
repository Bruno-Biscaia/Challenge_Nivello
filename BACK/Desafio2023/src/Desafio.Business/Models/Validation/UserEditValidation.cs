using Desafio.Business.Models.Request;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Desafio.Business.Models.Validation
{
    public class UserEditValidation : AbstractValidator<UserEditRequest>
    {
        public UserEditValidation() 
        {
            RuleFor(x => x.FullName)
                .NotEmpty()
                .WithMessage("O nome deve ser obrigatório!.");
            RuleFor(x => x.RoleId)
                .NotEmpty()
                .WithMessage("O usuário precisa ter uma Role!.");
          
        }
    }
}
