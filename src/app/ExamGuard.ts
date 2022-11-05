import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LanguageService } from '@upupa/language';
import { AuthService } from './features/membership/services/auth.service';





@Injectable({ providedIn: 'root' })
export class ExamGuard implements CanActivate {
    constructor(private auth: AuthService,
        private ls: LanguageService,
        private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const canActivate = this.auth.user;

        if (!canActivate)
            this.router.navigate(['/', this.ls.language ?? this.ls.defaultLang, 'account', 'login'], {
                queryParams: { redirect: state.url }
            });

        return canActivate;
    }

}
