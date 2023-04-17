using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using film_library_backEnd.Models.Reponse;
using film_library_backEnd.Models.Request;
using film_library_backEnd.Services.Films;

namespace film_library_backEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class FilmsController : ControllerBase
    {
        private readonly IFilmService _filmService;
        public FilmsController(IFilmService filmService)
        {
            _filmService = filmService;
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetAllFilms(int userId)
        {
            Response response = new Response();
            response.Data = await _filmService.GetFilms(userId);

            if(response.Data == null)
            {
                response.success = 0;
                response.message = "No se encontraron peliculas";
                return BadRequest(response);
            }

            response.success = 1;
            response.message = "Peliculas encontradas";
            return Ok(response);
        }

        [HttpGet("Images")]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllFilmsImages(string imagePath)
        {
            byte[] imageBytes = await System.IO.File.ReadAllBytesAsync(imagePath);
            return File(imageBytes, "image/jpeg");        
        }


        [HttpGet("Film{id}")]

        public async Task<IActionResult> GetFilmById(int id)
        {
            Response response = new Response();
            response.Data = await _filmService.GetFilmById(id);

            if (response.Data == null)
            {
                response.success = 0;
                response.message = "No se encontro la pelicula";
                return BadRequest(response);
            }

            response.success = 1;
            response.message = "Pelicula encontrada";
            return Ok(response);
        }

        [HttpPost("addFilm")]
        public async Task<IActionResult> PostFilm([FromForm] FilmRequest model)
        {
            Response response = new Response();


            response.Data = await _filmService.AddFilm(model);

            if (response.Data == null)
            {
                response.success = 0;
                response.message = "No se pudo agregar la pelicula";
                return BadRequest(response);
            }

            response.success = 1;
            response.message = "Pelicula agregada";
            return Ok(response);
        }

        [HttpPut("updateFilm")]
        public async Task<IActionResult> PutFilm([FromForm] FilmRequest model)
        {
            Response response = new Response();
            response.Data = await _filmService.UpdateFilm(model);

            if (response.Data == null)
            {
                response.success = 0;
                response.message = "No se pudo actualizar la pelicula";
                return BadRequest(response);
            }

            response.success = 1;
            response.message = "Pelicula actualizada";
            return Ok(response);
        }

        [HttpDelete("{id}")]
        
        public async Task<IActionResult> DeleteFilm(int id)
        {
            Response response = new Response();
            response.Data = await _filmService.DeleteFilm(id);

            if (response.Data == null)
            {
                response.success = 0;
                response.message = "No se pudo eliminar la pelicula";
                return BadRequest(response);
            }

            response.success = 1;
            response.message = "Pelicula eliminada";
            return Ok(response);
        }

    }
}
