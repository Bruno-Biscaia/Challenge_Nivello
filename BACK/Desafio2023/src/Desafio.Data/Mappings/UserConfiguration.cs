using Desafio.Business.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Desafio.Data.Mappings
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(u => u.Id);
            builder.Property(u => u.FullName).IsRequired();
            builder.Property(u => u.Email).IsRequired();
            builder.Property(u => u.MainPassword).IsRequired();

            builder.HasOne(u => u.Role)
                   .WithMany() 
                   .HasForeignKey(u => u.RoleId)
                   .IsRequired(false);
        }
    }
}
