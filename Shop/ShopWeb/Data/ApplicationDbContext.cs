using Microsoft.EntityFrameworkCore;
using ShopWeb.Models;

namespace ShopWeb.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<Account> Accounts { get;set; } 
    }
}
