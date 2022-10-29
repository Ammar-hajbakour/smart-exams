import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { LanguageService } from '@upupa/language';
import { environment } from 'src/environments/environment';
import { AuthService } from '../features/membership/services/auth.service';




@Injectable({ providedIn: 'root' })
export class ResponseGuard implements CanActivateChild {
    constructor(private ls: LanguageService, private router: Router, private auth: AuthService) { }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        const canActivate = this.auth.user && (this.auth.user?.roles?.indexOf('instructor') > -1 || this.auth.user?.roles?.indexOf('student'))

        if (!canActivate)
            this.router.navigate(['/', this.ls.language ?? this.ls.defaultLang, 'account', 'login'], {
                queryParams: { redirect: state.url }
            })

        return canActivate;
    }
}
