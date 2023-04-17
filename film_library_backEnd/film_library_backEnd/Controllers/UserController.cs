using film_library_backEnd.Models.Reponse;
using film_library_backEnd.Models.Request;
using film_library_backEnd.Services.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace film_library_backEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserService _userService; 

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> AuthenticateUser([FromBody] UserAuthRequest model)
        {
            Response response = new Response();

            var uResponse = await _userService.AuthUser(model);

            if (uResponse == null)
            {
                response.success = 0;
                response.message = "Usuario o contraseña incorrecta";
                return Ok(response);
            }

            response.success = 1;
            response.message = "Se ha iniciado sesion";
            response.Data = uResponse;

            return Ok(response);
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] UserRegisterRequest model)
        {
            Response response = new Response();

            var uResponse = await _userService.RegisterUser(model);

            if (uResponse == null)
            {
                response.success = 0;
                response.message = "Registro invalido o ya existente";
                return BadRequest(response);
            }

            response.success = 1;
            response.message = "Se ha registrado el usuario";
            response.Data = uResponse;

            return Ok(response);
        }

    }
}
