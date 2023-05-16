import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { OtpComponent } from './otp/otp.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PasswordHandlerService } from './password-handler.service';
import { GetCsrfService } from './get-csrf.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GoogleSignInComponent } from './google-sign-in/google-sign-in.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    OtpComponent,
    LoginComponent,
    HomepageComponent,
    DashboardComponent,
    GoogleSignInComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    CookieService,
    PasswordHandlerService,
    GetCsrfService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
