import { Component } from '@angular/core';
import { ApiUserService } from 'src/app/services/apiUser.service';
import { UserRegister } from 'src/app/models/user';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

   public hide: boolean = true;

    public RegisterForm = this.formBuilder.group({
    firstName: ['' , Validators.compose([Validators.required, Validators.pattern("[a-zA-Z ]*")])],
    lastName: ['', Validators.compose([Validators.required, Validators.pattern("[a-zA-Z ]*")])],
    userName: ['', Validators.compose([Validators.required, Validators.pattern("[a-zA-Z0-9]*")])],
    email: ['', Validators.compose([Validators.required, Validators.email])],
    password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
  })

  constructor(
   private _registerService: ApiUserService,
   public dialog: MatDialog,
   public snackBar: MatSnackBar,
   private formBuilder: FormBuilder,
  ) { }



 





  Register(){

     const user: UserRegister = this.RegisterForm.value as UserRegister;

    this._registerService.Register(user).subscribe(response => {
      if(response.success === 1){
        console.log(response);
        this.snackBar.open('Usuario registrado con exito!', '', { duration: 3000 });
      } else {
        this.snackBar.open('Error al registrar usuario!', '', { duration: 3000 });
      }});

      this.dialog.closeAll();
  }

  get FirstName(): FormControl{
    return this.RegisterForm.get('firstName') as FormControl;
  }

  get LastName(): FormControl{ 
    return this.RegisterForm.get('lastName') as FormControl;
  }

  get UserName(): FormControl{
    return this.RegisterForm.get('userName') as FormControl;
  }

  get Email(): FormControl{
    return this.RegisterForm.get('email') as FormControl;
  }

  get Password(): FormControl{
    return this.RegisterForm.get('password') as FormControl;
  }

  
}


