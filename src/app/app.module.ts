import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTableModule} from '@angular/material/table';
import { ProductApiService } from './product-api.service';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AccueilComponent } from './accueil/accueil.component';
import { FooterComponent } from './footer/footer.component';
import {MatDialogModule} from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { OwlModule } from 'ngx-owl-carousel';
import { LoginVendeurComponent } from './login-vendeur/login-vendeur.component';
import { RegisterVendeurComponent } from './register-vendeur/register-vendeur.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AlertComponent } from './alert/alert.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TabProductComponent } from './tab-product/tab-product.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { DashboardVendeurComponent } from './dashboard-vendeur/dashboard-vendeur.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { JwtModule } from "@auth0/angular-jwt";
import { AuthGuard } from './_helpers/AuthGuard';
import { ToastrModule } from 'ngx-toastr';
import { NgxLoadingModule } from 'ngx-loading';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ProfileVendeurComponent } from './profile-vendeur/profile-vendeur.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { CommandesComponent } from './commandes/commandes.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LoginUserComponent } from './clients/login-user/login-user.component';
import { RegisterUserComponent } from './clients/register-user/register-user.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { VerifyEmailClientComponent } from './clients/verify-email-client/verify-email-client.component';
import { DashboardAdminComponent } from './admin/dashboard-admin/dashboard-admin.component';
import { ListClientsComponent } from './admin/list-clients/list-clients.component';
import { ListProductsComponent } from './admin/list-products/list-products.component';
import { SmartphonesComponent } from './categories/smartphones/smartphones.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxPaginationModule } from 'ngx-pagination';
import { RefrigerateursComponent } from './categories/refrigerateurs/refrigerateurs.component';
import { PcPortablesComponent } from './categories/pc-portables/pc-portables.component';
import { ClimatiseursComponent } from './categories/climatiseurs/climatiseurs.component';
import { ScannersComponent } from './categories/scanners/scanners.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ListContactComponent } from './admin/list-contact/list-contact.component';
import { ReplyContactComponent } from './admin/reply-contact/reply-contact.component';
import { ForgotPasswordUserComponent } from './clients/forgot-password-user/forgot-password-user.component';
import { ResetPasswordUserComponent } from './clients/reset-password-user/reset-password-user.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductDetailsPcComponent } from './product-details-pc/product-details-pc.component';
import {MatStepperModule} from '@angular/material/stepper';
import { CompteClientComponent } from './clients/compte-client/compte-client.component';
import { HeaderClientComponent } from './clients/header-client/header-client.component';
import { AddToCartComponent } from './clients/add-to-cart/add-to-cart.component';
import { ElectroDetailsComponent } from './electro-details/electro-details.component';
import { ProdDetailsPcComponent } from './clients/produits/prod-details-pc/prod-details-pc.component';
import { ProdDetailsPhoneComponent } from './clients/produits/prod-details-phone/prod-details-phone.component';
import { ProdDetailsElectroComponent } from './clients/produits/prod-details-electro/prod-details-electro.component';
import { PhonesComponent } from './clients/categories-clients/phones/phones.component';
import { LaptopsComponent } from './clients/categories-clients/laptops/laptops.component';
import { ClimaComponent } from './clients/categories-clients/clima/clima.component';
import { FridgeComponent } from './clients/categories-clients/fridge/fridge.component';
import { ScannerComponent } from './clients/categories-clients/scanner/scanner.component';
import { WhishlistTableComponent } from './clients/whishlist-table/whishlist-table.component';
import { CheckoutComponent } from './clients/checkout/checkout.component';
import { ListCommandeComponent } from './admin/list-commande/list-commande.component';


export function tokenGetter() { 
  return localStorage.getItem("jwt"); 
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AccueilComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    LoginVendeurComponent,
    RegisterVendeurComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    AlertComponent,VerifyEmailClientComponent,
    TabProductComponent,
    DashboardVendeurComponent,
    AddProductComponent,
    EditProductComponent,
    ProfileVendeurComponent,
    VerifyEmailComponent,
    CommandesComponent,
    EditProfileComponent,
    LoginUserComponent,
    RegisterUserComponent,
    DashboardAdminComponent,
    ListClientsComponent,
    ListProductsComponent,
    SmartphonesComponent,
    RefrigerateursComponent,
    PcPortablesComponent,
    ClimatiseursComponent,
    ScannersComponent,
    AboutComponent,
    ContactComponent,
    ListContactComponent,
    ReplyContactComponent,
    ForgotPasswordUserComponent,
    ResetPasswordUserComponent,
    ProductDetailsComponent,
    ProductDetailsPcComponent,
    CompteClientComponent,
    HeaderClientComponent,
    AddToCartComponent,
    ElectroDetailsComponent,
    ProdDetailsPcComponent,
    ProdDetailsPhoneComponent,
    ProdDetailsElectroComponent,
    PhonesComponent,
    LaptopsComponent,
    ClimaComponent,
    FridgeComponent,
    ScannerComponent,
    WhishlistTableComponent,
    CheckoutComponent,
    ListCommandeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,FlexLayoutModule,
    MatFormFieldModule,MatTabsModule,MatProgressBarModule,
    MatInputModule,CarouselModule,MatPaginatorModule,MatStepperModule,
    MDBBootstrapModule.forRoot(),ToastrModule.forRoot(),
    MatIconModule,MatRadioModule,OwlModule,MatToolbarModule,
    MatSelectModule,ReactiveFormsModule, NgxLoadingModule.forRoot({}),
    MatDividerModule,FormsModule,MatGridListModule,
    MatListModule,HttpClientModule,NgxPaginationModule,
    MatCardModule,MatTableModule,NgbModule,
    MatExpansionModule,MatButtonModule,MatDialogModule,
    NgApexchartsModule,MatAutocompleteModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:5001"],
        disallowedRoutes: []
      }
    })
  ],
  providers: [ProductApiService],
  bootstrap: [AppComponent],
  entryComponents:[LoginComponent,RegisterComponent]
})
export class AppModule { }
