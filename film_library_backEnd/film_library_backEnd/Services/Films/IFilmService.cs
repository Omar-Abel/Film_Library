using film_library_backEnd.Models;
using film_library_backEnd.Models.Reponse;
using film_library_backEnd.Models.Request;

namespace film_library_backEnd.Services.Films
{
    public interface IFilmService
    {
        Task<IEnumerable<FilmResponse>> GetFilms(int userId);
        Task<Film> GetFilmById(int id);
        Task<Film> AddFilm(FilmRequest model);
        Task<Film> UpdateFilm(FilmRequest model);
        Task<Film> DeleteFilm(int id);
    }
}
