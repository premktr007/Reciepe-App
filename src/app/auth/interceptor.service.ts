import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, take } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable()
export class InterceptorService implements HttpInterceptor{

    constructor(private auth: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.auth.user.pipe(take(1), exhaustMap(user => {
            
            if(user == null) {  // for login and signup user will be null
                return next.handle(req)
            }

            const modifiedReq = req.clone({     // all other requests user will have token
                params: new HttpParams().set('auth', user.token)
            });
            return next.handle(modifiedReq);
        }))
    }
}