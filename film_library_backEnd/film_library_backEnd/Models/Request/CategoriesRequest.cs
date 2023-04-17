using Microsoft.Build.Framework;

namespace film_library_backEnd.Models.Request
{
    public class CategoriesRequest
    {
        public int id { get; set; }
        [Required] public string name { get; set; } = null!;
        [Required] public int userId { get; set; }
    }
}
