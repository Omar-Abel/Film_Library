import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiUserService } from '../services/apiUser.service';

export const authGuardFn: CanActivateFn = () => {
  const routerService = inject(Router);
  const apiAuthService = inject(ApiUserService);

  const user = apiAuthService.userData;

  if (user) {
    return true;
  }
  routerService.navigate(['/login']);
  return false;
};
