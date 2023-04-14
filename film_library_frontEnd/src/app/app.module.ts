import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FilmsPageComponent } from './components/films-page/films-page.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NavMainComponent } from './components/nav-main/nav-main.component';
import { FormsModule } from '@angular/forms';
import { JwtInterceptor } from './security/jwt.interceptor';
import { RegisterComponent } from './components/register/register.component';
import { ViewFilmComponent } from './components/view-film/view-film.component';
import { EditFilmComponent } from './components/edit-film/edit-film.component';
import { AddFilmComponent } from './components/add-film/add-film.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FilmsPageComponent,
    NavMainComponent,
    RegisterComponent,
    ViewFilmComponent,
    EditFilmComponent,
    AddFilmComponent,
    CategoriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
