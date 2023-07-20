import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtpComponent } from './otp/otp.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PlantViewComponent } from './plant-view/plant-view.component';
import { CartViewComponent } from './cart-view/cart-view.component';
import { AddPlantComponent } from './add-plant/add-plant.component';
import { AdminComponent } from './admin/admin.component';
import { ProfileComponent } from './profile/profile.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { LocationComponent } from './location/location.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { AboutUsComponent } from './about-us/about-us.component';

const routes: Routes = [
  {path: "otp", component: OtpComponent},
  {path: "signup", component: SignupComponent},
  {path: "login", component: LoginComponent},
  {path: "home", component: HomepageComponent},
  {path: "dash", component: DashboardComponent},
  {path: "forgotpassword", component: ForgotPasswordComponent},
  {path: "plant-view", component: PlantViewComponent},
  {path: "cart-view", component: CartViewComponent},
  {path: "add-plant", component: AddPlantComponent},
  {path: "admin", component: AdminComponent},
  {path: "profile", component: ProfileComponent},
  {path: "my-orders", component: MyOrdersComponent},
  {path: "location", component: LocationComponent},
  {path: "privacy-policy", component: PrivacyPolicyComponent},
  {path: "about-us", component: AboutUsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
