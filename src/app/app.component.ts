import { Component } from '@angular/core';

import { Platform,ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  showSplash = true; // <-- show animation
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar, modalCtrl: ModalController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {

      this.statusBar.styleDefault();
      this.splashScreen.hide();  // <-- hide static image

      //timer(3000).subscribe(() => this.showSplash = false) // <-- hide animation after 3s
      setTimeout(() => this.showSplash = false, 3000);
    });
  }
    
 /*   this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      let splash = this.modalCtrl.create(Splash);
      splash.present();
      //this.splashScreen.hide();
      //setTimeout(() => this.showSplash = false, 4000);
    });*/
  }

