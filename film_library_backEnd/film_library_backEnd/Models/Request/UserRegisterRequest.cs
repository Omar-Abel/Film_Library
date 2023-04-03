using System.ComponentModel.DataAnnotations;

namespace film_library_backEnd.Models.Request
{
    public class UserRegisterRequest
    {
        [Required] public string firstName { get; set; } = null!;
        [Required] public string lastName { get; set; } = null!;
        [Required] public string userName { get; set; } = null!;
        [Required] public string email { get; set; } = null!;
        [Required] public string password { get; set; } = null!;


    }
}
