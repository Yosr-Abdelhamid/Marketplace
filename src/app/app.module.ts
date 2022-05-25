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
    AlertComponent,
    TabProductComponent,
    DashboardVendeurComponent,
    AddProductComponent,
    EditProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,MatTabsModule,
    MatInputModule,CarouselModule,
    MDBBootstrapModule.forRoot(),ToastrModule.forRoot(),
    MatIconModule,MatRadioModule,OwlModule,MatToolbarModule,
    MatSelectModule,ReactiveFormsModule, NgxLoadingModule.forRoot({}),
    MatDividerModule,FormsModule,MatGridListModule,
    MatListModule,HttpClientModule,
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
