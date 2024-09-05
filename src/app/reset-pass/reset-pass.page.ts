import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.page.html',
  styleUrls: ['./reset-pass.page.scss'],
})
export class ResetPassPage {
  email: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private afAuth: AngularFireAuth) {}

  resetPassword() {
    this.afAuth.sendPasswordResetEmail(this.email)
      .then(() => {
        this.successMessage = 'Correo de restablecimiento enviado. Revisa tu bandeja de entrada.';
        this.errorMessage = '';
      })
      .catch((error) => {
        this.errorMessage = this.getErrorMessage(error);
        this.successMessage = '';
      });
  }

  private getErrorMessage(error: any): string {
    switch (error.code) {
      case 'auth/invalid-email':
        return 'El correo electrónico no es válido.';
      case 'auth/user-not-found':
        return 'No se encontró ningún usuario con este correo electrónico.';
      default:
        return 'Ocurrió un error al intentar restablecer la contraseña. Inténtalo nuevamente.';
    }
  }
}
