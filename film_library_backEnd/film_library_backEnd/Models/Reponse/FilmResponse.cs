using System.Drawing;

namespace film_library_backEnd.Models.Reponse
{
    public class FilmResponse
    {
        public int id { get; set; }
        public string tittle { get; set; } = null!;
        public string director { get; set; } = null!;
        public string description { get; set; } = null!;
        public DateTime releaseDate { get; set; }
        public string category { get; set; } = null!;
        public string imagePath { get; set; } = null!;
        public int userId { get; set; }
    }
}
