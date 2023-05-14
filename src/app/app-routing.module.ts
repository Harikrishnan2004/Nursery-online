import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtpComponent } from './otp/otp.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { compileClassMetadata } from '@angular/compiler';
import { HomepageComponent } from './homepage/homepage.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path: "otp", component: OtpComponent},
  {path: "signup", component: SignupComponent},
  {path: "login", component: LoginComponent},
  {path: "home", component: HomepageComponent},
  {path: "dash", component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
