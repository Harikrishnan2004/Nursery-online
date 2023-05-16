import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";
import { Router } from "@angular/router"
import { OnInit } from '@angular/core'
import { GetCsrfService } from '../get-csrf.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
[x: string]: any;
  emailOrPhone: String = ""
  password: String = ""
  fieldsDisabled: boolean = false;

  passwordType: String = "password"
  pass_check: Boolean = false

  ngOnInit(): void {
      if (this.cookieService.get('authToken') != '') {
        this.csrfService.getNewCsrf().subscribe({
          next: (response: any) => {
            this.tokenLogin(response["csrf"], this.cookieService.get('authToken'));
          },
          error: (error: any) => {
            console.log(error);
          }
        })
      }
  }

  constructor(private http: HttpClient, private router: Router, private csrfService: GetCsrfService,
    private cookieService: CookieService){

  }

  handleCredentialResponse(response: any){

  }

  getDetails(e: String, p: String){

    const password_check: string[] = ["!","@","#","$","%","^","&","*","(",")",".",",","/","\",","{","}","|","~","`"]
    this.emailOrPhone = e;
    this.password = p;

    if(this.emailOrPhone && this.password){
      this.fieldsDisabled = true;
      if(this.password){
        this.csrfService.getNewCsrf().subscribe({
          next: (response: any) => {
            this.emailLogin(response["csrf"]);
          },
          error: (error: any) => {
            console.log(error);
          }
        })
      }
    }
    else{
      alert("Fill all the information")
      return
    }
  }

  emailLogin(csrf: string) {
    this.http.post("http://127.0.0.1:8000/auth/login/", {
      "email/phone": this.emailOrPhone,
      "password": this.password,
      "csrf": csrf
    }).subscribe({
      next: (response: any)=>{
        if (response["authAPILogin-response"] == "Success") {
          if (response["authToken"] != "") {
            this.cookieService.set("authToken", response["authToken"]);
          }
          this.router.navigate(['/dash']);
        }
      },
      error: (err)=>{
        alert("Login Failed");
      }
    })
  }

  tokenLogin(csrf: string, authToken: string) {
    this.http.post("http://127.0.0.1:8000/auth/login/", {
      "email/phone": this.cookieService.get("email/phone"),
      "authToken": authToken,
      "csrf": csrf
    }).subscribe({
      next: (response: any)=>{
        if (response["authAPILogin-response"] == "Success") {
          if (response["authToken"] != "") {
            this.cookieService.set("authToken", response["authToken"]);
          }
          this.router.navigate(['/dash']);
        }
      },
      error: (err)=>{
        alert("Login Failed");
      }
    })

  }

  getPassword(value: String){
    this.password = value
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

  moveToSignup(){
    this.router.navigate(['/signup'])
  }
}
