import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilmsPageComponent } from './components/films-page/films-page.component';
import { LoginComponent } from './components/login/login.component';
import { authGuardFn } from './security/authFn.guard';
import { NavMainComponent } from './components/nav-main/nav-main.component';
import { RegisterComponent } from './components/register/register.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';

const routes: Routes = [
  { path: '',
    redirectTo: 'main', 
    pathMatch: 'full'
  },
  { path: 'main', 
    component: NavMainComponent,
    canActivate: [authGuardFn],
    title: 'Film Library', 
    children: [
      {
        path: '',
        redirectTo: 'films',
        pathMatch: 'full',
      },
      { 
        path: 'films', 
        component: FilmsPageComponent, 
        pathMatch: 'full' 
      },
      {
        path: 'categories',
        component: CategoriesComponent,
        pathMatch: 'full',
      }

  ]
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
    children: [
      {
        path: 'register',
        component: RegisterComponent,
        title: 'Register',
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'main'
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation : 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
