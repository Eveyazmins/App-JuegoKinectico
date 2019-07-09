import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../servicios/auth.service";
//import { Router } from "@angular/router";
//import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
//import { AuthService } from '../../services/user/auth.service';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';


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
   //private formBuilder: FormBuilder)
  )
    { }

  ngOnInit() {
  }

  onSubmitLogin()
  {
    this.authService.login(this.email, this.password).then( res =>{
      this.router.navigateByUrl('menu');
    }).catch(err => alert('los datos son incorrectos o no existe el usuario'))
  }
  async elegirusuario() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Administrador',
      buttons: [{
        text: 'Administrador',
        role: 'destructive',
        handler: () => {
          this.email="admin@gmail.com";
          this.password="123456";
          console.log('Delete clicked');
        }
      }, {
        text: 'Invitado',
        icon: 'share',
        handler: () => {
          this.email="invitado@gmail.com";
          this.password="123456";
          console.log('Share clicked');
        }
      }, {
        text: 'Usuario',
        icon: 'arrow-dropright-circle',
        handler: () => {
          this.email="usuario@gmail.com";
          this.password="123456";
          console.log('Play clicked');
        }
      }, {
        text: 'Anonimo',
        icon: 'heart',
        handler: () => {
          this.email="Anonimo@gmail.com";
          this.password="123456";
          console.log('Favorite clicked');
        }
      },
      {
        text: 'tester',
        icon: 'heart',
        handler: () => {
          this.email="tester@gmail.com";
          this.password="123456";
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

}
