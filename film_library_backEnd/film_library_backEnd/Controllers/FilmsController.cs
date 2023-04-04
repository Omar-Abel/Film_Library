using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using film_library_backEnd.Data;
using film_library_backEnd.Models;
using Microsoft.AspNetCore.Authorization;
using film_library_backEnd.Models.Reponse;
using film_library_backEnd.Services;
using film_library_backEnd.Models.Request;

namespace film_library_backEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class FilmsController : ControllerBase
    {
        private readonly IFilmService _filmService;
        public FilmsController(IFilmService filmService)
        {
            _filmService = filmService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllFilms()
        {
            Response response = new Response();
            response.Data = await _filmService.GetFilms();

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

        [HttpGet("{id}")]
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
        public async Task<IActionResult> PostFilm([FromBody] FilmRequest model)
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
        public async Task<IActionResult> PutFilm(FilmRequest model)
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
