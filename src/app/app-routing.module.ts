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
import { ProfileVendeurComponent } from './profile-vendeur/profile-vendeur.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { CommandesComponent } from './commandes/commandes.component';
import { LoginUserComponent } from './clients/login-user/login-user.component';
import { VerifyEmailClientComponent } from './clients/verify-email-client/verify-email-client.component';
import { DashboardAdminComponent } from './admin/dashboard-admin/dashboard-admin.component';
import { ListClientsComponent } from './admin/list-clients/list-clients.component';
import { AuthorizationGuard } from './clients/authorization.guard';
import { ListProductsComponent } from './admin/list-products/list-products.component';
import { SmartphonesComponent } from './categories/smartphones/smartphones.component';
import { PcPortablesComponent } from './categories/pc-portables/pc-portables.component';
import { RefrigerateursComponent } from './categories/refrigerateurs/refrigerateurs.component';
import { ClimatiseursComponent } from './categories/climatiseurs/climatiseurs.component';
import { ScannersComponent } from './categories/scanners/scanners.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ListContactComponent } from './admin/list-contact/list-contact.component';
import { ReplyContactComponent } from './admin/reply-contact/reply-contact.component';
import { ResetPasswordUserComponent } from './clients/reset-password-user/reset-password-user.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductDetailsPcComponent } from './product-details-pc/product-details-pc.component';
import { CompteClientComponent } from './clients/compte-client/compte-client.component';
import { AddToCartComponent } from './clients/add-to-cart/add-to-cart.component';
import { ElectroDetailsComponent } from './electro-details/electro-details.component';
import { ProdDetailsPhoneComponent } from './clients/produits/prod-details-phone/prod-details-phone.component';
import { ProdDetailsPcComponent } from './clients/produits/prod-details-pc/prod-details-pc.component';
import { ProdDetailsElectroComponent } from './clients/produits/prod-details-electro/prod-details-electro.component';
import { LaptopsComponent } from './clients/categories-clients/laptops/laptops.component';
import { PhonesComponent } from './clients/categories-clients/phones/phones.component';
import { FridgeComponent } from './clients/categories-clients/fridge/fridge.component';
import { ClimaComponent } from './clients/categories-clients/clima/clima.component';
import { ScannerComponent } from './clients/categories-clients/scanner/scanner.component';
import { WhishlistTableComponent } from './clients/whishlist-table/whishlist-table.component';
import { CheckoutComponent } from './clients/checkout/checkout.component';
import { ListCommandeComponent } from './admin/list-commande/list-commande.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProfilUserComponent } from './clients/profil-user/profil-user.component';
import { HistoryComponent } from './clients/history/history.component';
import { CommissionComponent } from './admin/commission/commission.component';
import { PocketComponent } from './pocket/pocket.component';
import { CommandesBySellerComponent } from './admin/commandes-by-seller/commandes-by-seller.component';
import { LoginCompteUserComponent } from './clients/login-compte-user/login-compte-user.component';

export const routes: Routes = [ 
  { path: 'accueil', component : AccueilComponent }, 
  { path: 'login-vendeur', component : LoginVendeurComponent }, 
  { path : 'login-user' , component: LoginUserComponent},
  { path: 'register-vendeur', component : RegisterVendeurComponent}, 
  { path:  'login' , component : LoginComponent},
  { path: 'forgot-password', component : ForgotPasswordComponent},
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'dashboard-vendeur' , component: DashboardVendeurComponent,canActivate:[AuthGuard]},
  { path: 'dashboard-vendeur/sold' , component: PocketComponent,canActivate:[AuthGuard]},
  { path: 'dashboard-vendeur/add-product' , component: AddProductComponent,canActivate:[AuthGuard]},
  { path: 'dashboard-vendeur/edit-product' , component : EditProductComponent ,canActivate:[AuthGuard]},
  { path: 'dashboard-vendeur/notifications', component: NotificationsComponent },
  { path: 'dashboard-vendeur/profile-vendeur' , component : ProfileVendeurComponent ,canActivate:[AuthGuard]},
  { path: 'verify-email' , component:VerifyEmailComponent},
  { path : 'verify-email-client' , component : VerifyEmailClientComponent},
  { path: 'dashboard-vendeur/tab-product' , component: TabProductComponent ,canActivate:[AuthGuard]},
  { path: 'dashboard-vendeur/commandes' , component: CommandesComponent ,canActivate:[AuthGuard]} ,
  { path:  'dashboard-admin' , component: DashboardAdminComponent,canActivate:[AuthorizationGuard]},
  { path : 'login-user' , component: LoginUserComponent} ,
  { path :  'compte-client' , component : CompteClientComponent , canActivate:[AuthorizationGuard]},
  { path :  'compte-client/profile' , component : ProfilUserComponent , canActivate:[AuthorizationGuard]},
  { path :  'compte-client/history' , component : HistoryComponent , canActivate:[AuthorizationGuard]},
  { path:   'add-toCart' , component : AddToCartComponent},
  { path:   'add-toCart/checkout' , component : CheckoutComponent, canActivate:[AuthorizationGuard]},
  { path : 'dashboard-admin/list-clients' , component : ListClientsComponent,canActivate:[AuthorizationGuard]},
  { path : 'dashboard-admin/list-produits' , component : ListProductsComponent,canActivate:[AuthorizationGuard]},
  { path : 'accueil/smartphones' , component : SmartphonesComponent} ,
  { path : 'accueil/laptops' , component : PcPortablesComponent} ,
  { path : 'accueil/fridges' , component : RefrigerateursComponent} ,
  { path : 'accueil/air-conditoner' , component : ClimatiseursComponent} ,
  { path : 'accueil/scanners' , component : ScannersComponent} ,
  { path : 'accueil/about' , component : AboutComponent} ,
  { path : 'accueil/contact' , component : ContactComponent} ,
  { path :  'accueil/product-details' , component : ProductDetailsComponent},
  { path : 'dashboard-admin/Orders' , component : ListCommandeComponent ,canActivate:[AuthorizationGuard]},
  { path : 'dashboard-admin/OrdersBySellers' , component : CommandesBySellerComponent ,canActivate:[AuthorizationGuard]},
  { path : 'dashboard-admin/commision' , component : CommissionComponent,canActivate:[AuthorizationGuard]},
  { path : 'dashboard-admin/Messages' , component : ListContactComponent,canActivate:[AuthorizationGuard]},
  { path : 'dashboard-admin/Messages/Reply' , component : ReplyContactComponent ,canActivate:[AuthorizationGuard]},
  { path : 'login-user/forgot-password-user' , component : ForgotPasswordComponent} ,
  { path:   'reset-password-user' , component: ResetPasswordUserComponent},
  { path: 'accueil/product-details-pc' , component:ProductDetailsPcComponent},
  {path :'accueil/product-details-electro' ,component:ElectroDetailsComponent},
  {path :'compte-client/prod-details' , component: ProdDetailsPhoneComponent , canActivate:[AuthorizationGuard]},
  {path :'compte-client/prod-details-pc' , component : ProdDetailsPcComponent ,canActivate:[AuthorizationGuard]},
  {path:'compte-client/prod-details-electro' , component : ProdDetailsElectroComponent ,canActivate:[AuthorizationGuard]} ,
  {path:'compte-client/laptops' , component : LaptopsComponent ,canActivate:[AuthorizationGuard]} ,
  {path:'compte-client/smartphones' , component : PhonesComponent , canActivate:[AuthorizationGuard]} ,
  {path:'compte-client/fridges' , component : FridgeComponent ,canActivate:[AuthorizationGuard]} ,
  {path:'compte-client/air-conditoner' , component : ClimaComponent ,canActivate:[AuthorizationGuard]} ,
  {path:'compte-client/scanners' , component : ScannerComponent ,canActivate:[AuthorizationGuard]} ,
  {path: 'whislist-Table' , component : WhishlistTableComponent} ,
  {path:'Login-registerUser' , component :LoginCompteUserComponent} ,
  { path: '', redirectTo: 'accueil', pathMatch: 'full' }

]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
