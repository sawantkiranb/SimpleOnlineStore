using System.Threading.Tasks;
using onlinestore.api.Models;

namespace onlinestore.api.Data
{
    public interface IStoreRepository
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
        Task<User> GetUser(int id);
    }
}