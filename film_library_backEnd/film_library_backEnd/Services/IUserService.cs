using film_library_backEnd.Models;
using film_library_backEnd.Models.Reponse;
using film_library_backEnd.Models.Request;

namespace film_library_backEnd.Services
{
    public interface IUserService
    {
        Task<UserResponse> AuthUser(UserAuthRequest model);

        Task<UserRegisterResponse> RegisterUser(UserRegisterRequest model);
    }
}
