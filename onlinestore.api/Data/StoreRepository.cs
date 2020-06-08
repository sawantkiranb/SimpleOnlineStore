using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using onlinestore.api.Models;

namespace onlinestore.api.Data
{
    public class StoreRepository : IStoreRepository
    {
        private readonly DataContext _context;
        public StoreRepository(DataContext context)
        {
            _context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }
        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }
        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
        public async Task<User> GetUser(int id)
        {
            return await _context.Users.FirstOrDefaultAsync(x => x.Id == id);
        }

    }
}