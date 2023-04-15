import { Component, Injectable, OnInit } from '@angular/core';
import { Categories } from 'src/app/models/Categories';
import { ApiCategoriesServiceService } from 'src/app/services/api-categories-service.service';

@Injectable({
  providedIn: 'root'
})


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(
    private _categoriesService: ApiCategoriesServiceService
  ) { }


  public ngOnInit(): void {
    this.getCategories();
    
  }

  
  public categories!: Categories[];

  displayedColumns: string[] = ['id', 'name', 'actions'];



 public getCategories() {
    this._categoriesService.getUserCategories().subscribe((response) => {
      console.log(response);
      this.categories = response.data;
    });
  }

  DeleteCategory(categoryId: number) {
    this._categoriesService.deleteUserCategory(categoryId).subscribe((response) => {
      console.log(response);
      this.getCategories();
    });
  }



}
