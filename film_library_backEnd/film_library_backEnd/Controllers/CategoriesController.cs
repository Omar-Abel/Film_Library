using film_library_backEnd.Models.Reponse;
using film_library_backEnd.Models.Request;
using film_library_backEnd.Services.Categories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace film_library_backEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoriesService _categoriesService;

        public CategoriesController(ICategoriesService categoriesService)
        {
            _categoriesService = categoriesService;
        }



        [HttpGet("{userId}")]
        public async Task<IActionResult> GetAllCategories(int userId)
        {
            Response response = new Response();
            response.Data = await _categoriesService.GetCategories(userId);
            if (response.Data == null)
            {
                response.success = 0;
                response.message = "No se encontraron categorias o error en la peticion";
                return BadRequest(response);
            }

            response.success = 1;
            response.message = "Categorias encontradas!";
            return Ok(response);
        }

        [HttpPost("addCategory")]
        public async Task<IActionResult> AddCategory([FromBody] CategoriesRequest model)
        {
            Response response = new Response();
            response.Data = await _categoriesService.AddCategory(model);
            if (response.Data == null)
            {
                response.success = 0;
                response.message = "No se pudo agregar la categoria";
                return BadRequest(response);
            }

            response.success = 1;
            response.message = "Categoria agregada!";
            return Ok(response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            Response response = new Response();
            response.Data = await _categoriesService.DeleteCategory(id);
            if (response.Data == null)
            {
                response.success = 0;
                response.message = "No se pudo eliminar la categoria";
                return BadRequest(response);
            }

            response.success = 1;
            response.message = "Categoria eliminada!";
            return Ok(response);
        }
    }
}
