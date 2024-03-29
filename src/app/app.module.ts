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
import { AddPlantComponent } from './add-plant/add-plant.component';
import { RazorpayComponent } from './razorpay/razorpay.component';
import { AdminComponent } from './admin/admin.component';
import { ProfileComponent } from './profile/profile.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { PlantsInfoService } from './plants-info.service';
import { PaymentService } from './payment.service';
import { LocationComponent } from './location/location.component';
import { InfoFooterComponent } from './info-footer/info-footer.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AdminService } from './admin.service';


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
    CartViewComponent,
    AddPlantComponent,
    RazorpayComponent,
    AdminComponent,
    ProfileComponent,
    MyOrdersComponent,
    LocationComponent,
    InfoFooterComponent,
    PrivacyPolicyComponent,
    AboutUsComponent,
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
    PlantViewComponent,
    PlantsInfoService,
    PaymentService,
    AdminService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
