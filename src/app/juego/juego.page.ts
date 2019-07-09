import { Component, OnInit } from '@angular/core';
import { DeviceMotion, DeviceMotionAccelerationData, DeviceMotionAccelerometerOptions } from '@ionic-native/device-motion/ngx';
import { AuthService } from '../services/user/auth.service';
import { Router } from '@angular/router';
import { JuegoService } from '../services/juego/juego.service';
import { AudioService } from '../services/audio/audio.service';
import {  OnDestroy } from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { ChatsService } from '../servicios/chats.service';


@Component({
  selector: 'app-juego',
  templateUrl: './juego.page.html',
  styleUrls: ['./juego.page.scss'],
})
export class JuegoPage implements OnInit,OnDestroy {


  public timeBegan = null
  public timeStopped:any = null
  public stoppedDuration:any = 0
  public started = null
  public running = false
  public blankTime = "00:00.000"
  public time = "00:00.000"

  subscription:any;
  options:any;
  x:Number;
  y:number;
  z:number;
  pantallaAncho:number;
  pantallaAlto :number;
  arriba:number;
  izquierda:number;
  rutaDeFoto:any;
  anchoDeFoto:any;
  aceleracion:any;

  timeStamp:string;

  data:any;
  onSuccess : any;
  onError : any;
constructor(private deviceMotion: DeviceMotion,private crudService: ChatsService,    private router: Router,
  private nativeAudio: NativeAudio,private vibration: Vibration, private js: JuegoService
  ) {
  this.options={ frequency: 50 };
  this.pantallaAncho = window.screen.width;
  this.pantallaAlto = window.screen.height;
  //this.rutaDeFoto="assets/icon.jpg";
  this.rutaDeFoto= this.js.personaje;
  this.anchoDeFoto=80;
}
ngOnInit()    {  
 // this.nativeAudio.preloadSimple('uniqueId1', 'assets/sound/juego.mp3').then(this.onSuccess, this.onError);
  this.nativeAudio.preloadSimple('uniqueId2', 'assets/sonido/perdistePPT.ogg').then(this.onSuccess, this.onError);
  //this.nativeAudio.play('uniqueId1').then(this.onSuccess, this.onError);
 this.start();

  this.arriba=600;
  this.izquierda=400;
  try {
        this.subscription = this.deviceMotion.watchAcceleration(this.options).subscribe((aceleracion: DeviceMotionAccelerationData) => {
          this.data= aceleracion;
         // this.nativeAudio.play('uniqueId1').then(this.onSuccess, this.onError);
          this.x= aceleracion.x*100;
          this.y= aceleracion.y*100;
          this.z= aceleracion.z*100; 
          if (this.x > this.pantallaAncho || this.x<-60)//horizontal 4seg
          {
            this.CreateRecord();
            this.router.navigateByUrl('resultados');
            this.vibration.vibrate(5000);
               this.nativeAudio.play('uniqueId2').then(this.onSuccess, this.onError);
               this.vibration.vibrate(1000);
               this.router.navigateByUrl('resultados');
               this.subscription.unsubscribe();
               this.stopclock();
               this.router.navigateByUrl('resultados');

          }
          if (this.y < -20 || this.y>740)//horizontal 4seg
          {
            this.CreateRecord();
            this.router.navigateByUrl('resultados');
            this.vibration.vibrate(5000);
               this.nativeAudio.play('uniqueId2').then(this.onSuccess, this.onError);
               this.vibration.vibrate(1000);
               this.subscription.unsubscribe();
               alert("Juego Perdido: Tu Tiempo fue:");
               this.CreateRecord();

               this.router.navigateByUrl('resultados');
       
          }
     

        });
  }catch(error)
  { console.log(error); }
     
 }

 CreateRecord() {
   alert("crear")
  let newStoppedDuration:any = (+new Date() - this.timeStopped)
  this.stoppedDuration = this.stoppedDuration + newStoppedDuration;

  let record = {};
  //record['nombre'] = this.nombre;
  record['nombre'] = "222";
  record['tiempo'] =  this.stoppedDuration ;
  
  //record['foto'] = this.foto;

  this.crudService.create_NewStudent(record);
  this.router.navigateByUrl('resultados');
}
  ngOnDestroy() {
   this.subscription.unsubscribe(); 
  }  
  
  start() {
    if(this.running)
      return;

    if (this.timeBegan === null) {
        //this.reset();
        this.timeBegan = new Date();
    }

    if (this.timeStopped !== null) {
      let newStoppedDuration:any = (+new Date() - this.timeStopped)
      this.stoppedDuration = this.stoppedDuration + newStoppedDuration;
    }

    this.started = setInterval(this.clockRunning.bind(this), 10);
    this.running = true;

  }

  stopclock() {
    this.running = false;
    this.timeStopped = new Date();
    clearInterval(this.started);
  }

  reset() {
    this.running = false;
    clearInterval(this.started);
    this.stoppedDuration = 0;
    this.timeBegan = null;
    this.timeStopped = null;
    this.time = this.blankTime;
  }

  zeroPrefix(num, digit) {
    let zero = '';
    for(let i = 0; i < digit; i++) {
      zero += '0';
    }
    return (zero + num).slice(-digit);
  }

  clockRunning(){
    let currentTime:any = new Date()
    let timeElapsed:any = new Date(currentTime - this.timeBegan - this.stoppedDuration)
    let hour = timeElapsed.getUTCHours()
    let min = timeElapsed.getUTCMinutes()
    let sec = timeElapsed.getUTCSeconds()
    let ms = timeElapsed.getUTCMilliseconds();

  this.time =
    this.zeroPrefix(hour, 2) + ":" +
    this.zeroPrefix(min, 2) + ":" +
    this.zeroPrefix(sec, 2) + "." +
    this.zeroPrefix(ms, 3);
  }
  


}