import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ActionSheetController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import {  NavParams } from '@ionic/angular';
import { IonContent, ModalController } from '@ionic/angular';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { AuthService } from "../servicios/auth.service";


import {ChatsService, chat } from "../servicios/chats.service";
import { ChatComponent } from "../componentes/chat/chat.component";



//PLUGINS INSTALADOS
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';





@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit   {

  ngOnInit(){
    this.chatservice.getChatRooms().subscribe( chats => {

      this.chatRooms = chats;

    })
  }

  splash = true;
  //secondPage = SecondPagePage;

  private actionSheet;

  private url_img = [];
  public chatRooms :any = [];
  private classBtnTematica='btn-animales';
  private faIconGrabar = "fa-microphone";
   private boolGrabarSecuencia: boolean = false;
   private secuenciaGrabada = [];
   private faIconReproducir = "fa-play-circle";
   private indiceSecuencia = -1;
   private idReproduciendose;
   private disabledBtnReproducir = false;
   private disabledBtnGrabar = false;
    x:string;
   y:string;
   z:string;
   timeStamp:string;

   data:any;
   subscription: any;
   onSuccess : any;
   onError : any;

  constructor( public router: Router,private flashlight: Flashlight,
              private nativeAudio: NativeAudio,
              private actionSheetCtrl: ActionSheetController,
              private toastCtrl: ToastController,
              private deviceMotion: DeviceMotion,private vibration: Vibration,              public chatservice : ChatsService,
              public actionSheetController: ActionSheetController,
              private modal : ModalController,    public authservice : AuthService,

              )
  {

    this.x="-";
    this.y="-";
    this.z="-";
    this.timeStamp="-";

   }


  ionViewDidLoad() {
    setTimeout(() => this.splash = false, 4000);

    //x costado
    //y arriba

    //1r activar y desactivar el detector de robo
    /*
     Al cambiar la posición (a izquierda o a derecha) emitirá un sonido distinto.
     Al ponerlo vertical, se encenderá la luz por 5 segundos y emitirá un sonido.
     Al ponerlo horizontal, vibrará por 5 segundos y emitirá un sonido.


       izquierda
    + Grabar los sonidos.
      Ejemplo: al moverlo hacia la izquierda, “¡Están hurtando el dispositivo!”, al
      moverlo hacia la derecha “¡Epa! ¿Qué estás por hacer?”.

       acostado = x:0.0242 y:02140 z=9.9013 usar  si (x es  menor a 1 y mayor a -1   Y ylomismo) 0.01
      se levanta del lado derecho  x:3.1111 y:0.2476 z=8.9313  x mayor 5 ()
      se levanta izq  x:-6.399 y:0.2787 z=7.9313 //usa  x neg -3
      vertical: x:0.2399 y:9.9287 z=0.9313 //usar y>7
        */
  }


   startWatching()
   {



      // Vibrate 2 seconds
      // Pause for 1 second
      // Vibrate for 2 seconds
      // Patterns work on Android and Windows only
//this.vibration.vibrate([2000,1000,2000]);

      // SONIDO
      this.nativeAudio.preloadSimple('uniqueId1', 'assets/sound/1.mp3').then(this.onSuccess, this.onError);
            this.nativeAudio.preloadSimple('uniqueId2', 'assets/sound/2.mp3').then(this.onSuccess, this.onError);
            this.nativeAudio.preloadSimple('uniqueId3', 'assets/sound/3.mp3').then(this.onSuccess, this.onError);
                  this.nativeAudio.preloadSimple('uniqueId4', 'assets/sound/4.mp3').then(this.onSuccess, this.onError);
                  this.nativeAudio.preloadSimple('uniqueId5', 'assets/sound/5.mp3').then(this.onSuccess, this.onError);

      this.nativeAudio.play('uniqueId1').then(this.onSuccess, this.onError);


    this.deviceMotion.getCurrentAcceleration().then(
     (acceleration: DeviceMotionAccelerationData) => console.log(acceleration),
     (error: any) => console.log(error)
   );
//carga aceleracion
   this.subscription=this.deviceMotion.watchAcceleration().subscribe((acceleration:DeviceMotionAccelerationData)=>{
     this.data= acceleration;
     //1r activar y desactivar el detector de robo
     /*
      Al cambiar la posición (a izquierda o a derecha) emitirá un sonido distinto.
      Al ponerlo vertical, se encenderá la luz por 5 segundos y emitirá un sonido.
      Al ponerlo horizontal, vibrará por 5 segundos y emitirá un sonido.


        izquierda
     + Grabar los sonidos.
       Ejemplo: al moverlo hacia la izquierda, “¡Están hurtando el dispositivo!”, al
       moverlo hacia la derecha “¡Epa! ¿Qué estás por hacer?”.

        acostado = x:0.0242 y:02140 z=9.9013 usar  si (x es  menor a 1 y mayor a -1   Y ylomismo) 0.01
       se levanta del lado derecho  x:3.1111 y:0.2476 z=8.9313  x mayor 5 ()
       se levanta izq  x:-6.399 y:0.2787 z=7.9313 //usa  x neg -3
       vertical: x:0.2399 y:9.9287 z=0.9313 //usar y>7
         */
     if (this.data.z > 9.87 && this.data.y<1 &&this.data.x<1)//horizontal 4seg
     {
       this.vibration.vibrate(5000);
          this.nativeAudio.play('uniqueId2').then(this.onSuccess, this.onError);
          this.vibration.vibrate(1000);

     }
     if(this.data.y>8 )
     {
       //ENCIENDE LA LUZ
      this.flashlight.switchOn();
      this.flashlight.switchOff();

        this.nativeAudio.play('uniqueId3').then(this.onSuccess, this.onError);
     }
     if(this.data.x>5)
     {
       this.nativeAudio.play('uniqueId4').then(this.onSuccess, this.onError);

     }
     if(this.data.x<-6)
     {
       this.nativeAudio.play('uniqueId5').then(this.onSuccess, this.onError);

     }


   })
 }





}
