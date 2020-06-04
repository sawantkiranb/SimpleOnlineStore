using Microsoft.EntityFrameworkCore;
using onlinestore.api.Models;

namespace onlinestore.api.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
    }
}