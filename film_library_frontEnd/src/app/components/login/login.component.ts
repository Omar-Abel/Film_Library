import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiAuthService } from 'src/app/services/apiAuth.service';







@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})



export class LoginComponent implements OnInit {
  public hide: boolean = true;

  public userName: string = '';
  public password: string = '';


  constructor( private authService: ApiAuthService,
    private router: Router) { 
      

  }

  ngOnInit(): void {
    console.log('test');
    if(this.authService.userData){
      this.router.navigate(['/main']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  LogIn(){
    this.authService.LogIn(this.userName, this.password).subscribe(response => {
      if(response.success === 1){
        this.router.navigate(['/main']);
      }
    });
  }



}
