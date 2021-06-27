import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { map, take, tap } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private auth: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): 
        boolean | Promise<boolean> | Observable<boolean> {
        return this.auth.user.pipe(
            take(1),               // take will unsubcribe the subscription after subject emitting 1st value
            map(user => {        //  map return boolean
            return !!user;
        }), tap(isAuth => {
            if(!isAuth) {
                this.router.navigate(['/auth']);
            }
        }))
    }
}