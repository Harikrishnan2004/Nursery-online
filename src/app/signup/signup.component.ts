import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { CookieService } from 'ngx-cookie-service';
import { PasswordHandlerService } from '../password-handler.service';
import { Router } from "@angular/router"

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  firstName: String = ""
  lastName: String = ""
  emailOrPhone: String = ""
  password: String = ""
  conformPassword: String =""
  fieldsDisabled: boolean = false;

  passwordType: String = "password"
  pass_check: Boolean = false

  userDetails: {}[] = []

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService,
    private passwordHandlerService: PasswordHandlerService){

  }

  getDetails(fn: String, ln: String, e: String, p: String, cp: String){

    const password_check: string[] = ["!","@","#","$","%","^","&","*","(",")",".",",","/","\",","{","}","|","~","`"]

      if(e.length >= 10){
        if(p.length > 8 && p.length < 12 && cp.length > 8 && cp.length < 12){
          for(const char of password_check){
            if(p.includes(char)){
              this.pass_check = true
              break
            }
          }
          if(this.pass_check){
            this.firstName = fn;
            this.lastName = ln;
            this.emailOrPhone = e;
            this.password = p;
            this.conformPassword = cp;
          }
          else{
            alert("Password must contain ateast one special character")
            return
          }
        }
        else{
          alert("Password length must be less than 12 and greater than 8")
          return
        }
      }
      else{
        alert("Enter valid email or phone number")
        return
      }


    if(this.firstName && this.lastName && this.emailOrPhone && this.password && this.conformPassword){
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
              console.log(this.emailOrPhone);
              this.router.navigate(['/otp'])
            }
          },
          error: (err)=>{
            alert("Invalid email or phone number");
            return
          }
        }
        )
      }
      else{
        alert("Conform password and password must me same")
        return
      }
    }
    else{
      alert("Fill all the information")
      return
    }
  }

  getPassword(value: String){
    this.password = value
  }
  getFirstname(value: String){
    this.firstName = value
  }
  getLastname(value: String){
    this.lastName = value
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

