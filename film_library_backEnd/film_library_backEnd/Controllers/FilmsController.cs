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

namespace film_library_backEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class FilmsController : ControllerBase
    {
        //[HttpGet]
        //public IActionResult GetFilms()
        //{
        //    Respuesta respuesta
        //}
  
       
    }
}
