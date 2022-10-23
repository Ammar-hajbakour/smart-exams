import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { LanguageService } from '@upupa/language';
import { environment } from 'src/environments/environment';
import { AuthService } from './features/membership/services/auth.service';


@Injectable({ providedIn: 'root' })
export class InstructorGuard implements CanActivateChild {
    constructor(private auth: AuthService,
        private ls: LanguageService,
        private router: Router) { }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const canActivate = this.auth.user?.roles?.indexOf('instructor') > -1
        if (!this.auth.user || !canActivate)
            this.router.navigate(['/', this.ls.language ?? this.ls.defaultLang, 'account', 'login'], {
                queryParams: { redirect: state.url }
            })

        return canActivate;
    }
}
