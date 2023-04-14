import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiUserService } from 'src/app/services/apiUser.service';
import { RegisterComponent } from '../register/register.component';
import { UserLogin } from 'src/app/models/user';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})



export class LoginComponent implements OnInit {
  public hide: boolean = true;
  public disable: boolean = false;



    public LoginForm = this.formBuilder.group({
    userName: ['', Validators.required],
    password: ['', Validators.required]
  })



  constructor( 
    private authService: ApiUserService,
    private router: Router,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    ) 
    { }

  ngOnInit(): void {
    if(this.authService.userData){
      this.router.navigate(['/main']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  LogIn(){
    const user: UserLogin = this.LoginForm.value as UserLogin;

    this.authService.LogIn(user).subscribe(response => {
      console.log(response);
      if(response.success === 1){
        this.snackBar.open('Se ha iniciado sesion!', 'Aceptar', { duration: 3000 });
        this.router.navigate(['/main']);
      } else {
        this.snackBar.open('Usuario o contraseña incorrecta!', 'Aceptar', { duration: 3000 });
      }

      

    });
  }

  openDialog() {
    this.dialog.open(RegisterComponent, {disableClose: true});
    
  }


}
