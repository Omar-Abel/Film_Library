import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Categories } from 'src/app/models/Categories';
import { Film } from 'src/app/models/films';
import { ApiCategoriesServiceService } from 'src/app/services/api-categories-service.service';
import { apiFilmService } from 'src/app/services/apiFilm.service';

@Component({
  selector: 'app-edit-film',
  templateUrl: './edit-film.component.html',
  styleUrls: ['./edit-film.component.css'],
})
export class EditFilmComponent implements OnInit {
  ngOnInit(): void {

    const categories: string[] = this.filmselected.category.split(',');
    const imageName = this.filmselected.imagePath.split(' ')[1];

    this.getCategories();

    this.EditingForm.patchValue({
      tittle: this.filmselected.tittle,
      director: this.filmselected.director,
      description: this.filmselected.description,
      releaseDate: formatDate(
        this.filmselected.releaseDate,
        'yyyy-MM-dd',
        'en'
      ),
        category: categories,
      imagePath: imageName,

    });
  }

  public filmselected!: Film;
  public image!: File;



  

  public categories: Categories[] = [];

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private _apiFilmService: apiFilmService,
    public snackBar: MatSnackBar,
    private _categoriesService: ApiCategoriesServiceService
  ) {}

  public EditingForm = this.formBuilder.group({
    tittle: ['', Validators.compose([Validators.required])],
    director: ['', Validators.compose([Validators.required])],
    description: ['', Validators.compose([Validators.required])],
    releaseDate: ['', Validators.compose([Validators.required])],
    category: [ this.formBuilder.array([]) ,Validators.compose([Validators.required])],
    imagePath: ['', Validators.compose([Validators.required])],
  });

  getCategories() {
    this._categoriesService.getUserCategories().subscribe((response) => {
      this.categories = response.data;
    });
  }

  ShowImage(event: any) {
    const file = (event.target as HTMLInputElement).files![0];
    this.EditingForm.patchValue({
      imagePath: file.name,
    });

    this.image = file;
  }

  EditFilm() {
    const formData = new FormData();
    formData.append('id', this.filmselected.id.toString());
    formData.append('tittle', this.EditingForm.value.tittle!);
    formData.append('director', this.EditingForm.value.director!);
    formData.append('description', this.EditingForm.value.description!);
    formData.append('releaseDate', this.EditingForm.value.releaseDate!);

    // Convert array to string of categories
    let categories = '';
    categories = this.EditingForm.value.category!.join(',');

    formData.append('category', categories!);

    if (this.image === undefined) {
      formData.append('imagePath', this.image = new File([], 'Hola'));
    }
    formData.append('image', this.image);

    formData.append('userId', '0');

    this._apiFilmService.updateFilm(formData).subscribe((response) => {
      if (response.success === 1) {
        this.snackBar.open('Pelicula editada con exito!', '', {
          duration: 3000,
        });
        setTimeout(() => {
        location.reload();
        }, 2000);
      } else {
        this.snackBar.open('Error al editar pelicula!', '', { duration: 3000 });
      }
      this.dialog.closeAll();
    });
  }

  close() {
    this.dialog.closeAll();
  }

  get Tittle(): FormControl {
    return this.EditingForm.get('tittle') as FormControl;
  }

  get Director(): FormControl {
    return this.EditingForm.get('director') as FormControl;
  }

  get Description(): FormControl {
    return this.EditingForm.get('description') as FormControl;
  }

  get ReleaseDate(): FormControl {
    return this.EditingForm.get('releaseDate') as FormControl;
  }

  get Category(): FormControl {
    return this.EditingForm.get('category') as FormControl;
  }

  get ImagePath(): FormControl {
    return this.EditingForm.get('imagePath') as FormControl;
  }
}
