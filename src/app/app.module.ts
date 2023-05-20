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
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { PlantViewComponent } from './plant-view/plant-view.component';
import { CartViewComponent } from './cart-view/cart-view.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    OtpComponent,
    LoginComponent,
    HomepageComponent,
    DashboardComponent,
    GoogleSignInComponent,
    ForgotPasswordComponent,
    PlantViewComponent,
    CartViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RecaptchaModule
  ],
  providers: [
    CookieService,
    PasswordHandlerService,
    GetCsrfService,
    DashboardComponent,
    PlantViewComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
