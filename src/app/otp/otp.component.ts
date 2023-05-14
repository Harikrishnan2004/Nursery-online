import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { PasswordHandlerService } from '../password-handler.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from "@angular/router"

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent {

  OTP: string = ""
  showLoading: boolean = false;

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService,
    private passwordHandlerService: PasswordHandlerService){}

  move(e: any, previous: any, present: any, next: any){
    var length = present.value.length;
    var max_length = present.getAttribute('maxlength');
    if(length == max_length){
      if(next != ''){
        next.focus();
      }
    }

    if(e.key === "Backspace"){
      if(previous != ''){
        previous.focus();
      }
    }
  }

  verify(no1: string, no2: string, no3: string, no4: string) {
    this.OTP = this.OTP.concat(no1, no2, no3, no4);
    if (this.OTP.toString().length != 4) {
      return;
    }
    this.showLoading = true;
    this.http.post("http://127.0.0.1:8000/auth/signup/",{
      "email/phone": this.cookieService.get("email/phone"),
      "otp": this.OTP,
      "password": this.passwordHandlerService.getPassword(),
      "fname": this.cookieService.get("fname"),
      "lname": this.cookieService.get("lname")
    }).subscribe({
      next: (response: any)=>{
        if (response["authAPISignUp-response"] == "Success") {
          this.cookieService.set("authToken", response["authToken"]);
          this.router.navigate(["/login"]);
        } else {
          this.showLoading = false;
        }
      },
      error: (err)=>{
        alert("Invalid OTP");
      }
    })
    this.OTP = "";
  }
}
