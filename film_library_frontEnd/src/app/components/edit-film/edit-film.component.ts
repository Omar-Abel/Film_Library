import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Film } from 'src/app/models/films';


@Component({
  selector: 'app-edit-film',
  templateUrl: './edit-film.component.html',
  styleUrls: ['./edit-film.component.css']
})
export class EditFilmComponent {

  public filmselected!: Film;

  public categories: string[] = ['Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Thriller'];

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
  ) { }

  public EditingForm = this.formBuilder.group({
    tittle: [ '' , Validators.compose([Validators.required])],
    description: ['', Validators.compose([Validators.required])],
    releaseDate: ['', Validators.compose([Validators.required])],
    category: ['', Validators.compose([Validators.required])],
    imagePath: ['', Validators.compose([Validators.required])],
  })

  uploadImage(event: any) {
    const file = (event.target as HTMLInputElement).files![0];
  }

  EditFilm(){

  }

  close() {
    this.dialog.closeAll();
  }


  get Tittle(): FormControl{
    return this.EditingForm.get('tittle') as FormControl;
  }

  get Description(): FormControl{
    return this.EditingForm.get('description') as FormControl;
  }

  get ReleaseDate(): FormControl{
    return this.EditingForm.get('releaseDate') as FormControl;
  }

  get Category(): FormControl{
    return this.EditingForm.get('category') as FormControl;
  }

  get ImagePath(): FormControl{
    return this.EditingForm.get('imagePath') as FormControl;
  }
  

}
