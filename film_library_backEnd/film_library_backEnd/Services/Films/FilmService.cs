using film_library_backEnd.Data;
using film_library_backEnd.Models;
using film_library_backEnd.Models.Reponse;
using film_library_backEnd.Models.Request;
using Microsoft.EntityFrameworkCore;
using System.Drawing;

namespace film_library_backEnd.Services.Films
{
    public class FilmService : IFilmService
    {

        public async Task<IEnumerable<FilmResponse>> GetFilms(int userId)
        {
            var response = new List<FilmResponse>();

            using (var db = new FILM_LIBRARYContext())
            {
                var filmsCount = await db.Films.Where(f => f.UserId == userId).CountAsync();
                if (filmsCount == 0) return null;

                var film = await db.Films.Where(f => f.UserId == userId).ToListAsync();

                foreach (var item in film)
                {
                    response.Add(new FilmResponse()
                    {
                        id = item.Id,
                        tittle = item.Tittle,
                        director = item.Director,
                        description = item.Description,
                        releaseDate = item.ReleaseDate,
                        category = item.Category,
                        imagePath = item.ImagePath,
                        userId = item.UserId
                    });
                }


            }
            return response;

        }

        public async Task<Film> GetFilmById(int id)
        {
            using (var db = new FILM_LIBRARYContext())
            {
                var film = await db.Films.FindAsync(id);
                if (film == null) return null;
                return film;
            }
        }

        public async Task<Film> AddFilm(FilmRequest model)
        {
            string fileName = Guid.NewGuid().ToString() + ' ' +model.image.FileName;
            string fullPath = Path.Combine(@"imgs", fileName);

            using (var stream = new FileStream(fullPath, FileMode.Create))
            {
                await model.image.CopyToAsync(stream);
            }

            using (var db = new FILM_LIBRARYContext())
            {

                var film = new Film()
                {
                    Tittle = model.tittle,
                    Description = model.description,
                    Director = model.director,
                    ReleaseDate = model.releaseDate,
                    Category = model.category,
                    ImagePath = fullPath,
                    UserId = model.userId
                };

                db.Films.Add(film);
                await db.SaveChangesAsync();

                return film;
            }
        }

        public async Task<Film> UpdateFilm(FilmRequest model)
        {
            string fileName = "";
            string fullPath = "";

            if (model.image.Length != 0)
            {
                fileName = Guid.NewGuid().ToString() + ' ' + model.image.FileName;
                fullPath = Path.Combine(@"imgs", fileName);

                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    await model.image.CopyToAsync(stream);
                }
            }

            using (var db = new FILM_LIBRARYContext())
            {
                var film = await db.Films.FindAsync(model.id);
                if (film == null) return null;

                film.Tittle = model.tittle;
                film.Director = model.director;
                film.Description = model.description;
                film.ReleaseDate = model.releaseDate;
                film.Category = model.category;

                if (model.image.Length != 0)
                {
                    File.Delete(film.ImagePath);
                    film.ImagePath = fullPath;
                }

                db.Entry(film).State = EntityState.Modified;
                await db.SaveChangesAsync();

                return film;
            }
        }

        public async Task<Film> DeleteFilm(int id)
        {
            using (var db = new FILM_LIBRARYContext())
            {
                var film = await db.Films.FindAsync(id);
                if (film == null) return null;

                db.Films.Remove(film);
                await db.SaveChangesAsync();

                return film;
            }

        }
    }
}

