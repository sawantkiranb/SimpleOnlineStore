using System.Collections.Generic;
using System.Threading.Tasks;
using onlinestore.api.Helpers;
using onlinestore.api.Models;

namespace onlinestore.api.Data
{
    public interface IStoreRepository
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
        Task<User> GetUser(int id);
        Task<IEnumerable<Product>> GetProducts(ProductFilter filter);
        Task<Product> GetProduct(int id);
        Task<int> GetMaxProductId();
        Task<Cart> GetCartItem(int id);
        Task<Cart> GetCartItemForUser(int userId, int productId);
        Task<IEnumerable<Cart>> GetCartForUser(int userId);
        Task<Like> GetLikedProduct(int id);
    }
}