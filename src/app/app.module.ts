import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminLoginComponent } from './login/admin-login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DoctorTableComponent } from './admin-view/doctor-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DoctorViewComponent } from './doctor-view/doctor-view.component';
import { PatientViewComponent } from './patient-view/patient-view.component';
import { IndexComponent } from './index/index.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SpecialitiesComponent } from './specialities/specialities.component';




@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    HeaderComponent,
    FooterComponent,
    DoctorTableComponent,
    DoctorViewComponent,
    PatientViewComponent,
    IndexComponent,
    NavbarComponent,
    SpecialitiesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
    
   
  ],
  providers: [],
  bootstrap: [AppComponent],


})
export class AppModule {

 }
