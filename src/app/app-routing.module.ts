import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "./guards/auth.guard";
import { NoLoginGuard } from "./guards/no-login.guard";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
 { path: 'login', loadChildren: './componentes/login/login.module#LoginPageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule', canActivate : [AuthGuard] },
  { path: 'registro', loadChildren: './componentes/registro/registro.module#RegistroPageModule', canActivate : [NoLoginGuard] },
  { path: 'splash', loadChildren: './splash/splash.module#SplashPageModule' },
  { path: 'juego', loadChildren: './juego/juego.module#JuegoPageModule' },
  { path: 'resultados', loadChildren: './resultados/resultados.module#ResultadosPageModule' },
  { path: 'menu', loadChildren: './menu/menu.module#MenuPageModule' },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
