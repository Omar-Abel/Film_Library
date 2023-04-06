import { Component, OnInit } from '@angular/core';
import { apiFilmService } from 'src/app/services/apiFilm.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

 public films: any[] = [];

  constructor( 
    private _filmService: apiFilmService
   ) { }

  ngOnInit(): void {
    this.getFilms();
   }

  getFilms() {
    this._filmService.getFilms().subscribe( response => {
      console.log(response);
      this.films = response.data;
   })
  }
}
