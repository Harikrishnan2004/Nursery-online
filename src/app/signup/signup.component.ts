import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { CookieService } from 'ngx-cookie-service';
import { PasswordHandlerService } from '../password-handler.service';
import { Router } from "@angular/router"
import { PlantsInfoService } from '../plants-info.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  firstName: String = ""
  lastName: string = ""
  emailOrPhone: String = ""
  password: String = ""
  conformPassword: String =""
  fieldsDisabled: boolean = false;

  invalidCred: boolean = false;
  invalidCredText: string = "";

  passwordType: String = "password"
  pass_check: Boolean = false

  userDetails: {}[] = []

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService,
    private passwordHandlerService: PasswordHandlerService, plantInfoObj: PlantsInfoService){

  }

  getDetails(fn: String, e: String, p: String, cp: String){
    this.invalidCred = false;
    const password_check: string[] = ["!","@","#","$","%","^","&","*","(",")",".",",","/","\",","{","}","|","~","`"]

      if(e.length >= 5){
          for(const char of password_check){
            if(p.includes(char)){
              this.pass_check = true
              break
            }
          }
          if(this.pass_check){
            this.firstName = fn;
            this.emailOrPhone = e;
            this.password = p;
            this.conformPassword = cp;
          }
          else{
            this.invalidCredText = "Password must contain ateast one special character";
            this.invalidCred = true;
            return
          }
        }
      else{
        this.invalidCredText = "Enter valid email or phone number";
        this.invalidCred = true;
        return
      }


    if(this.firstName && this.emailOrPhone && this.password && this.conformPassword) {
      this.invalidCred = false;
      this.lastName = this.firstName.split(" ")[this.firstName.split(" ").length - 1]
      this.cookieService.set("email/phone", this.emailOrPhone.toString());
      this.cookieService.set("fname", this.firstName.toString())
      this.cookieService.set("lname", this.lastName.toString())
      if(this.password === this.conformPassword){
        this.fieldsDisabled = true;
        this.passwordHandlerService.setPassword(this.password.toString());
        this.http.post("http://127.0.0.1:8000/auth/signup/", {
          "fname": this.firstName,
          "email/phone": this.emailOrPhone,
          "lname": this.lastName,
          "password": this.password
        }).subscribe({
          next: (response: any)=>{
            console.log(response)
            if(response["authAPISignUp-response"] == "OTP Verification Required") {
              this.router.navigate(['/otp']);
            } else if (response["authAPISignUp-response"] == "Failed") {
              this.invalidCredText = "User Already exists, Try Logging in";
              this.invalidCred = true;
              this.fieldsDisabled = false;
            }
          },
          error: (err)=>{
            console.error("Invalid email or phone number");
            return
          }
        }
        )

      }
      else{
        this.invalidCredText = "Passwords must match"
        this.invalidCred = true;
        return
      }
    }
    else{
      this.invalidCredText = "Fill all the information";
      this.invalidCred = true;
      return
    }
  }

  getPassword(value: String){
    this.password = value
  }
  getFirstname(value: String){
    this.firstName = value
  }
  getCpassword(value: String){
    this.conformPassword = value
  }
  getEmail(value: String){
    this.emailOrPhone = value
  }

  changeType(){
    console.log("clicked");
    if(this.passwordType == "password"){
      this.passwordType = "text"
    }
    else{
      this.passwordType = "password"
    }
  }
}

