
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Desafio.Business.Models
{
    public class Role
    {     
        public int Id { get; set; }
        [Column("Role")]
        public string RoleName { get; set; }
        public short Level { get; set; }

    }
}
