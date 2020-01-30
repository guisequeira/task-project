import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

/**
 * Descrição da minnha classe
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

/**
 * Página para o login
 */
export class LoginPage implements OnInit {

  /**
   * Formulário de login
   */
  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('gui@asd.asd', {
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl('asdasd', {
      validators: [Validators.minLength(6), Validators.required]
    })
  });


  public textButton: string;

  /**
   * true/false de acordo com o estado da chamada de autenticacao
   */
  public isSuccess: boolean;

  /**
   * true/false de acordo com o estado da chamada de login
   */
  public isLoading: boolean;

  /**
   * Construtor da classe
   * @param authService serviço para autenticação
   * @param router utilizado para rotas
   * @param toastController utilizado para exibir mensagem
   */
  constructor(
    private authService: AuthService,
    private router: Router,
    public toastController: ToastController
    ) { }

  /** This is a description of the foo function. */
  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.textButton = 'Fazer login';
    });
  }

  /**
   * Exibe o componente de mensagem
   * @param msg texto da mensagem a ser exibida
   */
  private async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      // duration: 2000,
      position: 'top',
      color: 'danger',
      buttons: [
        {
          text: 'Fechar',
          role: 'cancel'
        }
      ]
    });
    toast.present();
  }

  /**
   * Envia o formulário
   */
  public onSubmit() {
    console.log('onclick');
    this.isLoading = true;
    this.textButton = 'Enviando Dados';

    const email: string = this.loginForm.controls.email.value;
    const password: string = this.loginForm.controls.password.value;

    this.authService.loginWithEmail(email, password).then(user => {
      this.isLoading = false;
      this.router.navigateByUrl('tasks');
    }).catch(error => {
      this.isLoading = false;
      this.presentToast(error.message);
    });

  }

}
