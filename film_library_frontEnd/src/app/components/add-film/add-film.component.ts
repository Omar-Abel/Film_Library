import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Categories } from 'src/app/models/Categories';
import { FilmResponse } from 'src/app/models/films';
import { ApiCategoriesServiceService } from 'src/app/services/api-categories-service.service';
import { apiFilmService } from 'src/app/services/apiFilm.service';
import { ApiUserService } from 'src/app/services/apiUser.service';



@Component({
  selector: 'app-add-film',
  templateUrl: './add-film.component.html',
  styleUrls: ['./add-film.component.css']
})
export class AddFilmComponent implements OnInit {


  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private _apiFilmService: apiFilmService,
    public snackBar: MatSnackBar,
    private _apiAuthService: ApiUserService,
    private _categoriesService: ApiCategoriesServiceService
  ) { }

  public categories: Categories[] = [];
  public image!: File;


  ngOnInit(): void {
    this.getCategories();
  }

  CreateFilm(){
    const formData = new FormData();
    formData.append('tittle', this.AddingForm.value.tittle!);
    formData.append('director', this.AddingForm.value.director!);
    formData.append('description', this.AddingForm.value.description!);
    formData.append('releaseDate', this.AddingForm.value.releaseDate!);
    formData.append('category', this.AddingForm.value.category!);
    formData.append('image',  this.image);
    formData.append('userId', this._apiAuthService.userData.id.toString());

    this._apiFilmService.addFilm(formData).subscribe((response) => {
      console.log(response);
      if (response.success === 1) {
        this.snackBar.open('Pelicula añadida con exito!', 'Aceptar', { duration: 3000 });
        setTimeout(() => {
        location.reload();
        }, 2000);
      }
      else {
        this.snackBar.open('Error al añadir pelicula!', 'Aceptar', { duration: 3000 });
      }
      this.dialog.closeAll();



    });

  }

  ShowImage(event: any) {
    const file = (event.target as HTMLInputElement).files![0];
    this.AddingForm.patchValue({
      imagePath: file.name
    });

    this.image = file;
  }

  getCategories() {
    this._categoriesService.getUserCategories().subscribe((response) => {
      this.categories = response.data;
    });
  }


  close() {
    this.dialog.closeAll();
  }

  public AddingForm = this.formBuilder.group({
    tittle: [ '' , Validators.compose([Validators.required])],
    director: ['', Validators.compose([Validators.required])],
    description: ['', Validators.compose([Validators.required])],
    releaseDate: ['', Validators.compose([Validators.required])],
    category: ['', Validators.compose([Validators.required])],
    imagePath: [ '', Validators.compose([Validators.required])],
  })


  get Tittle(): FormControl{
    return this.AddingForm.get('tittle') as FormControl;
  }
  
  get Director(): FormControl{
    return this.AddingForm.get('director') as FormControl;
  }

  get Description(): FormControl{
    return this.AddingForm.get('description') as FormControl;
  }

  get ReleaseDate(): FormControl{
    return this.AddingForm.get('releaseDate') as FormControl;
  }

  get Category(): FormControl{
    return this.AddingForm.get('category') as FormControl;
  }

  get ImagePath(): FormControl{
    return this.AddingForm.get('imagePath') as FormControl;
  }
}
