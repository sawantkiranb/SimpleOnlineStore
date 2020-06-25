using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using onlinestore.api.Helpers;
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
            return await _context.Users
            .FirstOrDefaultAsync(x => x.Id == id);
        }
        public async Task<IEnumerable<Product>> GetProducts(ProductFilter filter)
        {
            var products = _context.Products
            .Include(p => p.Photos)
            .Include(c => c.Category)
            .Include(l => l.Likes)
            .AsQueryable();

            switch (filter.SortBy)
            {
                case "new":
                    products = products.OrderByDescending(p => p.DateAdded);
                    break;
                case "pricehtl":
                    products = products.OrderByDescending(p => p.Price);
                    break;
                case "pricelth":
                    products = products.OrderBy(p => p.Price);
                    break;
            }

            if (!string.IsNullOrWhiteSpace(filter.SearchText))
            {
                products = products.Where(p => p.Name.ToLower().Contains(filter.SearchText.ToLower()));
            }

            return await products.ToListAsync();
        }
        public async Task<Product> GetProduct(int id)
        {
            var product = await _context.Products
            .Include(p => p.Photos)
            .Include(c => c.Category)
            .Include(l => l.Likes)
            .FirstOrDefaultAsync(p => p.Id == id);

            return product;
        }

        public async Task<int> GetMaxProductId()
        {
            return await _context.Products
            .MaxAsync(p => p.Id);
        }

        public async Task<Cart> GetCartItem(int id)
        {
            return await _context.Carts
            .Include(p => p.Product)
            .FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<Cart> GetCartItemForUser(int userId, int productId)
        {
            return await _context.Carts
            .Include(p => p.Product)
            .FirstOrDefaultAsync(c => c.ProductId == productId && c.UserId == userId);
        }

        public async Task<IEnumerable<Cart>> GetCartForUser(int userId)
        {
            return await _context.Carts
            .Include(p => p.Product)
            .Include(c => c.Product.Photos)
            .Where(x => x.UserId == userId)
            .ToListAsync();
        }

        public async Task<Like> GetLikedProduct(int userId, int productId)
        {
            return await _context.Likes
            .FirstOrDefaultAsync(p => p.UserId == userId && p.ProductId == productId);
        }

        public async Task<IEnumerable<Like>> GetLikedProducts(int userId)
        {
            return await _context.Likes
            .Include(p => p.Product)
            .Include(p => p.Product.Photos)
            .Where(p => p.UserId == userId)
            .ToListAsync();
        }

        public async Task<IEnumerable<ShippingAddress>> GetAddresses(int userId)
        {
            return await _context.ShippingAddresses
            .Where(u => u.UserId == userId)
            .OrderByDescending(u => u.IsDefault)
            .ToListAsync();
        }

        public async Task<ShippingAddress> GetAddress(int id)
        {
            return await _context.ShippingAddresses
            .FirstOrDefaultAsync(a => a.Id == id);
        }
    }
}