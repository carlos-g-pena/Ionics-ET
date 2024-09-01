import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  userName: string = '';

  constructor(private afAuth: AngularFireAuth) {}

  ngOnInit() {
    this.afAuth.currentUser.then(user => {
      if (user) {
        this.userName = user.displayName || 'Usuario';
      }
    });
  }
 

}
