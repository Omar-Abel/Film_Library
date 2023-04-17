using film_library_backEnd.Models.Request;

namespace film_library_backEnd.Models.Reponse
{
    public class UserResponse
    {
        public int id { get; set; }
        public string userName { get; set; } = null!;
        public string token { get; set; } = null!;
    }
}
