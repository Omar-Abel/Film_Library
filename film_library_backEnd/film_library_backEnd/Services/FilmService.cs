using film_library_backEnd.Data;
using film_library_backEnd.Models;
using film_library_backEnd.Models.Reponse;
using film_library_backEnd.Models.Request;
using Microsoft.EntityFrameworkCore;

namespace film_library_backEnd.Services
{
    public class FilmService : IFilmService
    {

        public async Task<IEnumerable<Film>> GetFilms()
        {
            using (var db = new FILM_LIBRARYContext())
            {
                var filmsCount =  await db.Films.CountAsync();
                if (filmsCount == 0) return null;

                var films = await db.Films.ToListAsync();
                    return films;
            }
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
            using (var db = new FILM_LIBRARYContext())
            {

                var film = new Film()
                {
                    Tittle = model.tittle,
                    Description = model.description,
                    ReleaseDate = model.releaseDate,
                    Category = model.category,
                    ImagePath = model.imagePath
                };


                db.Films.Add(film);
                await db.SaveChangesAsync();

                return film;
            }
        }

        public async Task<Film> UpdateFilm(FilmRequest model)
        {
            using (var db = new FILM_LIBRARYContext())
            {
                var film = await db.Films.FindAsync(model.id);
                if (film == null) return null;


                film.Tittle = model.tittle;
                film.Description = model.description;
                film.ReleaseDate = model.releaseDate;
                film.Category = model.category;
                film.ImagePath = model.imagePath;



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
