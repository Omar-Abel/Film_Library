import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { apiFilmService } from 'src/app/services/apiFilm.service';
import { ViewFilmComponent } from '../view-film/view-film.component';
import { Film } from 'src/app/models/films';

@Component({
  selector: 'app-films-page',
  templateUrl: './films-page.component.html',
  styleUrls: ['./films-page.component.css'],
})


export class FilmsPageComponent implements OnInit {
  public films: Film[] = [];
  film!: Film;

  constructor(private _filmService: apiFilmService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getFilms();
  }
  
  getFilmSelected(filmId: number) {
    
    this.film = this.films.find((film) => film.id === filmId) as Film;
    const model = this.dialog.open(ViewFilmComponent, { data: this.film });
    model.componentInstance.filmselected = this.film;
    
  }

  getFilms() {
    this._filmService.getUserFilms().subscribe((response) => {
      console.log(response);
      this.films = response.data;
    });
  }
}
