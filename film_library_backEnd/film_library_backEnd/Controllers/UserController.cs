using film_library_backEnd.Models.Reponse;
using film_library_backEnd.Models.Request;
using film_library_backEnd.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace film_library_backEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
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

            var uResponse = _userService.Auth(model);

            if (uResponse == null)
            {
                response.success = 0;
                response.message = "Usuario o contraseña incorrecta";
                return BadRequest(response);
            }

            response.success = 1;
            response.message = "Se ha iniciado sesion";
            response.Data = uResponse;
            
            return Ok(response);
        }

        //[HttpPost("register")]
        //public async Task<IActionResult> RegisterUser()
        //{
        //    Response response = new Response();

        //}

    }
}
