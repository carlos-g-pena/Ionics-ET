import { Injectable } from '@angular/core';
import { Router,CanActivate, ActivatedRouteSnapshot, GuardResult, MaybeAsync, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map,tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}
  canActivate(): Observable<boolean>{
      return  this.afAuth.authState.pipe(
        map(user => !!user),  
        tap(loggedIn => {
          if (!loggedIn) {
            this.router.navigate(['/login']);  
          }
        })
      );
  }
}
