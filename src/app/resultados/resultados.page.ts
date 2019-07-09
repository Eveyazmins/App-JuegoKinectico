import { Component, OnInit } from '@angular/core';
//import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ChatsService } from '../servicios/chats.service';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase/app';
import { AlertController } from '@ionic/angular';
import { Router } from "@angular/router";
import {AuthService} from "../servicios/auth.service";
//import {BarcodeScannerOptions,BarcodeScanner} from "@ionic-native/barcode-scanner/ngx";
//import { FCM } from '@ionic-native/fcm/ngx';//AGREGADO PUSH NOTIF
//import {EmpleadosService} from '../../services/empleados/empleados.service';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.page.html',
  styleUrls: ['./resultados.page.scss'],
})
export class ResultadosPage implements OnInit {
  public userProfile: any;
  filename:string;
  students: any;
  foto:string;
  nombre: string;
  codigoUid:string="";
  votacion:any;
  name:any;
  
  x:string;
  y:string;
  z:string;
  timeStamp:string;

  constructor(private crudService: ChatsService,private user:AuthService) { 
  
  }

  ngOnInit() {
    this.crudService
    .getUserProfile()
    .get()
    .then( userProfileSnapshot => {
      this.userProfile = userProfileSnapshot.data();
      // console.log(this.userProfile);
      this.name = userProfileSnapshot.data().name;
//this.perfil= userProfileSnapshot.data().perfil;
    });
    
    this.crudService.read_Students().subscribe(data => {

      this.students = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          nombre: e.payload.doc.data()['nombre'],
          tiempo: e.payload.doc.data()['tiempo'],
         // perfil: e.payload.doc.data()['perfil'],

        };
      })
      console.log(this.students);

    });
  }





}
