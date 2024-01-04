using Desafio.Business.Interfaces;
using Desafio.Business.Models.Request;
using Desafio.Business.Models.Validation;
using Desafio.Business.Notificações;
using FluentValidation;
using FluentValidation.Results;

namespace Desafio.Business.Services
{
    public class BaseService
    {
        private readonly INotification _notification;

        public BaseService(INotification notification)
        {
            _notification = notification;
        }

        protected void Notification(string message)
        {
            _notification.SendNotification(new Notification(message));
        }

        protected void Notification(ValidationResult validationResult)
        {
            foreach (var error in validationResult.Errors)
            {
                Notification(error.ErrorMessage);
            }
        }

        protected bool ExecuteValidation<TValidator, TEntity>(TValidator validator, TEntity entity) where TValidator : AbstractValidator<TEntity>
        {
            var validationResult = validator.Validate(entity);

            if (validationResult.IsValid)
            {
                return true;
            }

            Notification(validationResult);

            return false;
        }

        protected bool ExecuteEditUserValidation(UserEditValidation validator, UserEditRequest userEditRequest)
        {
            var validationResult = validator.Validate(userEditRequest);

            if (validationResult.IsValid)
            {
                return true;
            }

            Notification(validationResult);

            return false;
        }

    }
}
