using film_library_backEnd.Data;
using film_library_backEnd.Models;
using film_library_backEnd.Models.Request;
using Microsoft.EntityFrameworkCore;

namespace film_library_backEnd.Services.Categories
{
    public class CategoriesService : ICategoriesService
    {
        public async Task<IEnumerable<CategoriesRequest>> GetCategories(int userId)
        {
            using (var db = new FILM_LIBRARYContext())
            {
                var categoriesCount = await db.Categories.Where(c => c.IdUser == userId).CountAsync();
                if (categoriesCount == 0) return null;

                var categories = await db.Categories.Where(c => c.IdUser == userId).ToListAsync();

                var response = new List<CategoriesRequest>();

                foreach (var item in categories)
                {
                    response.Add(new CategoriesRequest()
                    {
                        id = item.Id,
                        name = item.Name,
                        userId = item.IdUser
                    });
                }

                return response;
            }
        }

        public async Task<Category> AddCategory(CategoriesRequest model)
        {
            using (var db = new FILM_LIBRARYContext())
            {
                var category = new Category()
                {
                    Name = model.name,
                    IdUser = model.userId
                };

                db.Categories.Add(category);
                await db.SaveChangesAsync();

                return category;
            }
        }

        public async Task<Category> DeleteCategory(int id)
        {
            using (var db = new FILM_LIBRARYContext())
            {
                var category = await db.Categories.FindAsync(id);
                if (category == null) return null;

                db.Categories.Remove(category);
                await db.SaveChangesAsync();
                return category;
            }
            
        }
    }
}
