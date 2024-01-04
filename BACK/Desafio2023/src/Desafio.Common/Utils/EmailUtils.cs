using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Desafio.Common.Utils
{
    public static class EmailUtils
    {
        public static string CleanEmail(string email)
        {
            email = Regex.Replace(email.Trim(), @"\s", "");
            return email;
        }
    }
}
