import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
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
import { HomeTwoComponent } from './home-two/home-two.component';
import { ProductCarouselTwoComponent } from './home-two/product-carousel-two/product-carousel-two.component';
import { OwlModule } from 'ngx-owl-carousel';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AccueilComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    HomeTwoComponent,
    ProductCarouselTwoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,MatTabsModule,
    MatInputModule,CarouselModule,
    MDBBootstrapModule.forRoot(),
    MatIconModule,MatRadioModule,OwlModule,
    MatSelectModule,ReactiveFormsModule,
    MatDividerModule,FormsModule,MatGridListModule,
    MatListModule,HttpClientModule,
    MatCardModule,MatTableModule,NgbModule,
    MatExpansionModule,MatButtonModule,MatDialogModule,
  ],
  providers: [ProductApiService],
  bootstrap: [AppComponent],
  entryComponents:[LoginComponent,RegisterComponent]
})
export class AppModule { }
