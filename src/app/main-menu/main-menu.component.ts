import { Component, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent {
  @Input() userName: string='';

  constructor(private afAuth: AngularFireAuth,
    private router: Router
  ){}
  logout() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
      }).catch(error=>{
        console.log('Error al cerrar sesion ',error);
      });
  }
}
