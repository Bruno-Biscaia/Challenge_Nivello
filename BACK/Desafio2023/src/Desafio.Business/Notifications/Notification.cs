using Desafio.Business.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Desafio.Business.Notificações
{
    public class Notification
    {
        public Notification(string message)
        {
            Message = message; 
        }

        public string Message { get; set; }
    }
}
