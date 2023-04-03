using film_library_backEnd.Models;
using film_library_backEnd.Models.Reponse;
using film_library_backEnd.Models.Request;

namespace film_library_backEnd.Services
{
    public interface IUserService
    {
        UserResponse Auth(UserAuthRequest model);

        UserRegisterResponse Register(UserRegisterRequest model);
    }
}
