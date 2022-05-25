import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginVendeurComponent } from './login-vendeur/login-vendeur.component';
import { RegisterVendeurComponent } from './register-vendeur/register-vendeur.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { TabProductComponent } from './tab-product/tab-product.component';
import { DashboardVendeurComponent }from './dashboard-vendeur/dashboard-vendeur.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_helpers/AuthGuard';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';



export const routes: Routes = [ 
  { path: 'accueil', component : AccueilComponent }, 
  { path: 'login-vendeur', component : LoginVendeurComponent }, 
  { path: 'register-vendeur', component : RegisterVendeurComponent}, 
  { path:  'login' , component : LoginComponent},
  { path: 'forgot-password', component : ForgotPasswordComponent},
  { path: 'reset-password', component: ResetPasswordComponent },
  { path:  'dashboard-vendeur' , component: DashboardVendeurComponent,canActivate:[AuthGuard]},
  { path:  'dashboard-vendeur/add-product' , component: AddProductComponent,canActivate:[AuthGuard]},
  { path:   'dashboard-vendeur/edit-product' , component : EditProductComponent ,canActivate:[AuthGuard]},
 
  

  { path: '', redirectTo: 'accueil', pathMatch: 'full' }

]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
