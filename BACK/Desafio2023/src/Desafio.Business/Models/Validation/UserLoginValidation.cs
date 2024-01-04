using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Desafio.Business.Models.Validation
{
    public class UserLoginValidation : AbstractValidator<User>
    {
        public UserLoginValidation()
        {
            RuleFor(x => x.FullName)
                 .NotEmpty()
                 .WithMessage("O nome deve ser obrigatório!.");
            RuleFor(x => x.MainPassword)
                 .NotEmpty()
                 .WithMessage("A senha deve ser obrigatória.!");               
        }
    }
}
