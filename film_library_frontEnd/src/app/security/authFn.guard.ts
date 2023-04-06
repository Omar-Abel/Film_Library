import { CanActivateFn } from "@angular/router";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { ApiAuthService } from "../services/apiAuth.service";



export const authGuardFn: CanActivateFn = () => {
    
    const routerService = inject(Router);
    const apiAuthService = inject(ApiAuthService);

    const user = apiAuthService.userData;

    if (user) {
        return true;
    } else {
        routerService.navigate(['/login']);
        return false;
    }


}

