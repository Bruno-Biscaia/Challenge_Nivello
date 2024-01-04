using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Desafio.Business.Models.Validation
{
    public class UserValidation : AbstractValidator<User> 
    {
        public UserValidation()
        {
            RuleFor(x => x.FullName)
                 .NotEmpty()
                 .WithMessage("O nome deve ser obrigatório!.");
            RuleFor(x => x.Email)
                 .NotEmpty()
                 .WithMessage("O email deve ser obrigatório!.")
                 .EmailAddress().WithMessage("O Email informado é invalido!.");
            RuleFor(x => x.MainPassword)
               .NotEmpty()
               .WithMessage("A senha deve ser obrigatória!.");
        }
    }
}
