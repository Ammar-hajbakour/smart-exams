import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from './features/membership/services/auth.service';


@Injectable({ providedIn: 'root' })
export class InstructorGuard implements CanActivateChild {
    constructor(private auth: AuthService) { }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return environment.production === false ? true : this.auth.user?.roles?.indexOf('instuctor') > -1;
    }
}
