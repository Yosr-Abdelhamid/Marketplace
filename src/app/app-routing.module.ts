import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { LoginVendeurComponent } from './login-vendeur/login-vendeur.component';
import { PageVendeurComponent } from './page-vendeur/page-vendeur.component';
import { RegisterVendeurComponent } from './register-vendeur/register-vendeur.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { TabProductComponent } from './tab-product/tab-product.component';
import { DashboardVendeurComponent }from './dashboard-vendeur/dashboard-vendeur.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_helpers/AuthGuard';



export const routes: Routes = [ 
  { path: 'accueil', component : AccueilComponent }, 
  { path: 'login-vendeur', component : LoginVendeurComponent }, 
  { path: 'register-vendeur', component : RegisterVendeurComponent}, 
  { path:  'login' , component : LoginComponent},
  { path: 'page-vendeur', component : PageVendeurComponent },
  { path: 'forgot-password', component : ForgotPasswordComponent},
  { path: 'reset-password', component: ResetPasswordComponent },
  { path:  'dashboard' , component: DashboardComponent},
  { path:  'page-vendeur/product' , component: TabProductComponent},
  { path:  'dashboard-vendeur/home' , component: HomeComponent},
  { path:  'dashboard-vendeur' , component: DashboardVendeurComponent,canActivate:[AuthGuard]},
 
  

  { path: '', redirectTo: 'accueil', pathMatch: 'full' }

]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
