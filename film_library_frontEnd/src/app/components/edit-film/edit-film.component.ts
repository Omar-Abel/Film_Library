import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Categories } from 'src/app/models/Categories';
import { Film } from 'src/app/models/films';
import { ApiCategoriesServiceService } from 'src/app/services/api-categories-service.service';


@Component({
  selector: 'app-edit-film',
  templateUrl: './edit-film.component.html',
  styleUrls: ['./edit-film.component.css']
})
export class EditFilmComponent implements OnInit {

  ngOnInit(): void {
    this.getCategories();
  }

  public filmselected!: Film;

  public categories: Categories[] = [];

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private _categoriesService: ApiCategoriesServiceService
  ) { }

  public EditingForm = this.formBuilder.group({
    tittle: [ '' , Validators.compose([Validators.required])],
    description: ['', Validators.compose([Validators.required])],
    releaseDate: [ '', Validators.compose([Validators.required])],
    category: ['', Validators.compose([Validators.required])],
    imagePath: ['', Validators.compose([Validators.required])],
  })



  getCategories() {
    this._categoriesService.getUserCategories().subscribe((response) => {
      console.log(response);
      this.categories = response.data;
    });
  }

  uploadImage(event: any) {
    const file = (event.target as HTMLInputElement).files![0].name;

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
