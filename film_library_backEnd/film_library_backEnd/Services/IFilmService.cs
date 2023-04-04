using film_library_backEnd.Models;
using film_library_backEnd.Models.Request;

namespace film_library_backEnd.Services
{
    public interface IFilmService
    {
        Task<IEnumerable<Film>> GetFilms();
        Task<Film> GetFilmById(int id);
        Task<Film> AddFilm(FilmRequest model);
        Task<Film> UpdateFilm(FilmRequest model);
        Task<Film> DeleteFilm(int id);
    }
}
