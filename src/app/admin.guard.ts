import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './features/membership/services/auth.service';


@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivateChild {
    constructor(private auth: AuthService) { }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.auth.user?.roles?.indexOf('admin') > -1;
    }
}




