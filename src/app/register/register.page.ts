import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async register() {
    const { email, password, fullName } = this.registerForm.value;
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      if (user) {
        await user.updateProfile({
          displayName: fullName,
        });
      }
      this.navCtrl.navigateForward('/home');
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  async showError(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Error en el registro',
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
