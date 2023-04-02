using System.ComponentModel.DataAnnotations;

namespace film_library_backEnd.Models.Request
{
    public class UserAuthRequest
    {
        [Required]
        public string userName { get; set; } = null!;

        [Required]
        public string password { get; set; } = null!;
    }
}
