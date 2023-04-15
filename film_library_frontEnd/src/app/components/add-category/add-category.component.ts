import { Component, Inject} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriesResponse } from 'src/app/models/Categories';
import { ApiCategoriesServiceService } from 'src/app/services/api-categories-service.service';
import { ApiUserService } from 'src/app/services/apiUser.service';
import { CategoriesComponent } from '../categories/categories.component';



@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private _apiAuthService: ApiUserService,
    private _categoriesService: ApiCategoriesServiceService,
    public snackBar: MatSnackBar,
    public cat: CategoriesComponent,
  ) { }



  public AddingForm = this.formBuilder.group({
    categoryName: [ '' , Validators.compose([Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')])],
  })

  

  close(){
    this.dialog.closeAll();
  }

  CreateCategory(){
    const category: CategoriesResponse = {
      name: this.AddingForm.value.categoryName!,
      userId: this._apiAuthService.userData.id
    }

    this._categoriesService.addUserCategory(category).subscribe(response => {
      if(response.success === 1){
        this.snackBar.open('Categoria creada con exito!', 'Aceptar', { duration: 3000 });
        setTimeout(() => {
        location.reload();
        }, 3000);

        this.dialog.closeAll();
        

      } else {
        this.snackBar.open('Error al crear la categoria', 'Aceptar', { duration: 3000 });
        this.dialog.closeAll();
      }});

      this.cat.ngOnInit();
}

  get CategoryName() {
    return this.AddingForm.get('categoryName') as FormControl;
  }
}
