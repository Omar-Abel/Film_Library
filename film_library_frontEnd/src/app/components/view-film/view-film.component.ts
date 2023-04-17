import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { Film } from 'src/app/models/films';
import { EditFilmComponent } from '../edit-film/edit-film.component';
import { apiFilmService } from 'src/app/services/apiFilm.service';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-view-film',
  templateUrl: './view-film.component.html',
  styleUrls: ['./view-film.component.css']
})
export class ViewFilmComponent implements OnInit {

  @ViewChild('deleteConfirmation') DeleteConfirmation!: TemplateRef<any>;


 public filmselected!: Film;
  breakpoint: any;



  constructor(
    public dialog: MatDialog,
    private _apiFilmService: apiFilmService,
    public snackBar: MatSnackBar
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
    const model = this.dialog.open(EditFilmComponent, { data: this.filmselected, disableClose: true });
    model.componentInstance.filmselected = this.filmselected;
  }

  openDeleteFilm() {
    const model = this.dialog.open(this.DeleteConfirmation, {disableClose: true});
  }

  deleteFilm(){

    this.close();
    this._apiFilmService.deleteFilm(this.filmselected.id).subscribe(
      (response) => {
        if( response.success == 1){
          this.snackBar.open('Pelicula eleminada!', 'Aceptar', {duration: 2000});  
        } else {
          this.snackBar.open('Error al eleminar pelicula', 'Aceptar', {duration: 2000});  
        }
      })

      setTimeout(() => {
        window.location.reload();
      }, 2000);



      }
      
  }




