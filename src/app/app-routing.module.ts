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

const routes: Routes = [
  {path: "otp", component: OtpComponent},
  {path: "signup", component: SignupComponent},
  {path: "login", component: LoginComponent},
  {path: "home", component: HomepageComponent},
  {path: "dash", component: DashboardComponent},
  {path: "forgotpassword", component: ForgotPasswordComponent},
  {path: "plant-view", component: PlantViewComponent},
  {path: "cart-view", component: CartViewComponent},
  {path: "add-plant", component: AddPlantComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
