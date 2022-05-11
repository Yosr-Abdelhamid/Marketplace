import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginVendeurComponent } from './login-vendeur/login-vendeur.component';
import { PageVendeurComponent } from './page-vendeur/page-vendeur.component';
import { RegisterVendeurComponent } from './register-vendeur/register-vendeur.component';

export const routes: Routes = [ 
  { path: 'accueil', component : AccueilComponent }, 
  { path: 'login-vendeur', component : LoginVendeurComponent }, 
  { path: 'register-vendeur', component : RegisterVendeurComponent}, 
  { path: 'page-vendeur', component : PageVendeurComponent },
  {path:  'forgot-password', component : ForgotPasswordComponent},

  { path: '', redirectTo: 'accueil', pathMatch: 'full' }

]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
