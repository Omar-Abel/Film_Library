using Microsoft.Build.Framework;
using Microsoft.CodeAnalysis.Scripting.Hosting;

namespace film_library_backEnd.Models.Request
{
    public class FilmRequest
    {
        public int id { get; set; }
        [Required] public string tittle { get; set; } = null!;
        [Required] public string description { get; set; } = null!;
        [Required] public DateTime releaseDate { get; set; }
        [Required] public string category { get; set; } = null!;
        [Required] public string imagePath { get; set; } = null!;


    }
}
