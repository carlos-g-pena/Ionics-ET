import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async login() {
    const { email, password } = this.loginForm.value;
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
      this.navCtrl.navigateForward('/home');
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  async showError(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Error en el inicio de sesión',
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
