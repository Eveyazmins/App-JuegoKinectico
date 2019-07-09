import { Component, OnInit } from '@angular/core';
import { JuegoService } from '../services/juego/juego.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(private js: JuegoService, private router: Router) { }

  ngOnInit() {
  }

  imagenMaravilla()
  {
    this.js.getPersonaje("assets/maravillaicon.jpg");
    this.router.navigateByUrl('juego');
  }

  imagenTormenta()
  {
    this.js.getPersonaje("assets/tormentaicon.jpg");
    this.router.navigateByUrl('juego');
  }

}
