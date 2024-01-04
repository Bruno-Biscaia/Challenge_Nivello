using Desafio.Business.Interfaces;

namespace Desafio.Business.Notificações
{
    public class Notifier : INotification
    {
        private List<Notification> _notifications;
        public Notifier()
        {
            _notifications = new List<Notification>();
        }

        public List<Notification> GetNotifications()
        {
            return _notifications;
        }

        public bool HasNotification()
        {
            return _notifications.Any();
        }

        public void SendNotification(Notification notification)
        {
            _notifications.Add(notification);
        }
    }
}
