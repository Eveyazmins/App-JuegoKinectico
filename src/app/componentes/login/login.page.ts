import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../servicios/auth.service";
//import { Router } from "@angular/router";
//import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
//import { AuthService } from '../../services/user/auth.service';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { ToastController, NavController, ModalController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;

  constructor( public loadingCtrl: LoadingController,
    public actionSheetController: ActionSheetController,
    public alertCtrl: AlertController,
    private authService: AuthService,
    private router: Router,
    public toastController: ToastController
   //private formBuilder: FormBuilder)
  )
    { }

  ngOnInit() {
  }

  onSubmitLogin()
  {
    this.authService.login(this.email, this.password).then( res =>{
      this.router.navigateByUrl('menu');
   // }).catch(err => alert('los datos son incorrectos o no existe el usuario'))
  }).catch(err =>this.perdioToast()) 
  }
  async elegirusuario() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Administrador',
        role: 'destructive',
        handler: () => {
          this.email="admin@gmail.com";
          this.password="111111";
          console.log('Delete clicked');
        }
      }, {
        text: 'Invitado',
        handler: () => {
          this.email="invitado@gmail.com";
          this.password="111111";
          console.log('Share clicked');
        }
      }, {
        text: 'Usuario',
        handler: () => {
          this.email="usuario@gmail.com";
          this.password="111111";
          console.log('Play clicked');
        }
      }, {
        text: 'Anonimo',
        handler: () => {
          this.email="anonimo@gmail.com";
          this.password="111111";
          console.log('Favorite clicked');
        }
      },
      {
        text: 'tester',
        handler: () => {
          this.email="tester@gmail.com";
          this.password="111111";
          console.log('Favorite clicked');
        }
      },
     
       {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
 
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }


  async perdioToast() {
    
    const toast = await this.toastController.create({
      message: 'Los datos son incorrectos o no existe el usuario',
      showCloseButton: true,
      position: 'top',
      closeButtonText: 'Aceptar',
      duration: 3000
    });
    toast.present();
}

}
