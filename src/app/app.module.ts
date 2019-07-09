import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
// import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { firebaseConfig } from "../environments/environment";
import { NativeAudio } from '@ionic-native/native-audio/ngx';

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule, FirestoreSettingsToken } from "@angular/fire/firestore";
import { ChatComponent } from './componentes/chat/chat.component';

import { FormsModule } from "@angular/forms";

//PLUGINS
import { Vibration } from '@ionic-native/vibration/ngx';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { SplashPage } from './splash/splash.page';

@NgModule({
  declarations: [AppComponent, ChatComponent],
  entryComponents: [ ChatComponent ],
  imports: [FormsModule, BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule, AngularFirestoreModule],
  providers: [
    StatusBar,NativeAudio,DeviceMotion,Vibration,Flashlight,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide: FirestoreSettingsToken, useValue: {}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
