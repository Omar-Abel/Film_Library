import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-film',
  templateUrl: './add-film.component.html',
  styleUrls: ['./add-film.component.css']
})
export class AddFilmComponent {

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
  ) { }

  public categories: string[] = ['Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Thriller'];


  CreateFilm(){
    const formData = new FormData();
    formData.append('tittle', this.AddingForm.value.tittle!);
    formData.append('description', this.AddingForm.value.description!);
    formData.append('releaseDate', this.AddingForm.value.releaseDate!);
    formData.append('category', this.AddingForm.value.category!);
    formData.append('image', this.AddingForm.value.imagePath!);


  }

  uploadImage(event: any) {
    const file = (event.target as HTMLInputElement).files![0].name;
    console.log(file);
    this.AddingForm.patchValue({
      imagePath: file
    });
    this.AddingForm.get('imagePath')!.updateValueAndValidity();
  }

  close() {
    this.dialog.closeAll();
  }



  public AddingForm = this.formBuilder.group({
    tittle: [ '' , Validators.compose([Validators.required])],
    description: ['', Validators.compose([Validators.required])],
    releaseDate: ['', Validators.compose([Validators.required])],
    category: ['', Validators.compose([Validators.required])],
    imagePath: ['', Validators.compose([Validators.required])],
  })


  get Tittle(): FormControl{
    return this.AddingForm.get('tittle') as FormControl;
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
