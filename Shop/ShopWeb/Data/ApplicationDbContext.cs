using Microsoft.EntityFrameworkCore;
using ShopWeb.Models;

namespace ShopWeb.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<Account> accounts { get;set; } 
        public DbSet<Cart>  carts { get;set; }
        public DbSet<Cart_belongs_to> cart_belongs_to { get; set; }
        public DbSet<InCart> incarts { get; set; }
        public DbSet<Item> items { get; set; }
    }
}
