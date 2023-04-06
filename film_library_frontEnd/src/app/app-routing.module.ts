import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { authGuardFn } from './security/authFn.guard';
import { NavMainComponent } from './components/nav-main/nav-main.component';

const routes: Routes = [
  { path: '',
    redirectTo: 'main', 
    pathMatch: 'full'
  },
  { path: 'main', 
    component: NavMainComponent,
    canActivate: [authGuardFn],
    title: 'Main', 
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      { 
        path: 'home', 
        component: HomePageComponent, 
        pathMatch: 'full' 
      },

  ]
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: '**',
    redirectTo: 'main'
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
