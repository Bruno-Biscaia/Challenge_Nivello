using Desafio.Business.Notificações;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Desafio.Business.Interfaces
{
    public interface INotification
    {
        bool HasNotification();
        List<Notification> GetNotifications();
        void SendNotification(Notification notification);
    }
}
