import { Component, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { Film } from 'src/app/models/films';
import { EditFilmComponent } from '../edit-film/edit-film.component';


@Component({
  selector: 'app-view-film',
  templateUrl: './view-film.component.html',
  styleUrls: ['./view-film.component.css']
})
export class ViewFilmComponent implements OnInit {

 public filmselected!: Film;
  breakpoint: any;

  constructor(
    public dialog: MatDialog
  ) { }


  ngOnInit(): void {
      this.breakpoint = (window.innerWidth <= 400) ? 1 : 2;
  }

  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 2;
  }

  close() {
    this.dialog.closeAll();
  }

  openEditFilm() {
    this.close();
    const model = this.dialog.open(EditFilmComponent, { data: this.filmselected });
    model.componentInstance.filmselected = this.filmselected;
    
  }

}


