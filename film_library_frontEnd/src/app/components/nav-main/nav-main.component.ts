import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ApiUserService } from 'src/app/services/apiUser.service';
import { MatDialog } from '@angular/material/dialog';
import { AddFilmComponent } from '../add-film/add-film.component';

@Component({
  selector: 'app-nav-main',
  templateUrl: './nav-main.component.html',
  styleUrls: ['./nav-main.component.css']
})
export class NavMainComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private _apiAuthService: ApiUserService,
    public dialog: MatDialog,
    ) {}

    user = this._apiAuthService.userData.userName;

    OpenAddDialog() {
      this.dialog.open(AddFilmComponent);
    }

    LogOut() {
      this._apiAuthService.LogOut();
      window.location.reload();
    }

}
