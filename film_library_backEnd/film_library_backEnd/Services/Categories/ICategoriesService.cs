using film_library_backEnd.Models;
using film_library_backEnd.Models.Request;

namespace film_library_backEnd.Services.Categories
{
    public interface ICategoriesService
    {
        Task<IEnumerable<CategoriesRequest>> GetCategories(int userId);
        Task<Category> AddCategory(CategoriesRequest model);
        Task<Category> DeleteCategory(int id);

    }
}
