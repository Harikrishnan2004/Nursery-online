import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  captcha: string;
  hideOTPfield: boolean;
  hideInputField: boolean;
  hideLoading: boolean;
  hideNewPassword: boolean;

  constructor(private http: HttpClient, private router: Router) {
    this.captcha = "";
    this.hideInputField = false;
    this.hideOTPfield = true;
    this.hideLoading = true;
    this.hideNewPassword = true;
  }

  resolved(captchaResponse: string) {
    this.captcha = captchaResponse;
  }

  reset(email: string) {
    if (this.captcha == "") return;
    this.captcha = "";
    this.hideInputField = true;
    this.hideLoading = false;
    this.http.post("http://127.0.0.1:8000/auth/reset/", {
      "email/phone": email
    }).subscribe({
      next: (response: any) => {
        if (response["authAPIforgotPassword-response"] == "OTP Verification Required") {
          this.hideOTPfield = false;
          this.hideLoading = true;
        } else {
          this.hideInputField = false;
          this.hideLoading = true;
        }
      },

      error: (err: any) => {
        console.log(err);
      }
    })
  }

  submitOTP(email: string, otp: string) {
    if (otp == "") return;
    this.hideLoading = false;
    this.hideOTPfield = true;
    this.http.post("http://127.0.0.1:8000/auth/reset/", {
      "email/phone": email,
      "otp": otp
    }).subscribe({
      next: (response: any) => {
        if (response["authAPIforgotPassword-response"] == "Matched") {
          this.hideNewPassword = false;
          this.hideLoading = true;
        } else {
          this.hideOTPfield = false;
          this.hideLoading = true;
        }
      },

      error: (err: any) => {
        console.log(err);
      }
    })
  }

  resetPassword(email: string, otp: string, password: string, confirm_password: string) {
    if (confirm_password == password) {
      this.http.post("http://127.0.0.1:8000/auth/reset/", {
        "email/phone": email,
        "otp": otp,
        "new-password": password
      }).subscribe({
        next: (response: any) => {
          console.log(response);
        },

        error: (error: any) => {
          console.log(error);
        }
      })
    }
  }
}
