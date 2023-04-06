import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiUserService } from 'src/app/services/apiUser.service';
import { RegisterComponent } from '../register/register.component';
import { UserLogin } from 'src/app/models/user';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})



export class LoginComponent implements OnInit {
  public hide: boolean = true;



    public LoginForm = this.formBuilder.group({
    userName: ['', Validators.required],
    password: ['', Validators.required]
  })



  constructor( 
    private authService: ApiUserService,
    private router: Router,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
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
      if(response.success === 1){
        this.router.navigate(['/main']);
      }
    });
  }

  openDialog() {
    this.dialog.open(RegisterComponent, {disableClose: true});
    
  }


}
