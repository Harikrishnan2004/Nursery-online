import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";
import { Router } from "@angular/router"
import { OnInit } from '@angular/core'
import { GetCsrfService } from '../get-csrf.service';
import { CookieService } from 'ngx-cookie-service';
import { PlantsInfoService } from '../plants-info.service';

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
  invalidCred: boolean = false;
  plantInfoService: any

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
    private cookieService: CookieService, private plantService: PlantsInfoService){
      this.plantInfoService = PlantsInfoService
  }


  getDetails(e: String, p: String){
    const password_check: string[] = ["!","@","#","$","%","^","&","*","(",")",".",",","/","\",","{","}","|","~","`"]
    this.emailOrPhone = e;
    this.password = p;

    if(this.emailOrPhone && this.password){
      this.fieldsDisabled = true;
      this.invalidCred = false;
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
      this.invalidCred = true;
    }
  }

  emailLogin(csrf: string) {
    this.cookieService.set("email/phone", this.emailOrPhone.toString());
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
          console.log(this.cookieService.get("email/phone").toString());
          if (this.cookieService.get("email/phone").toString() === "tatwamasi.admin") {
            this.router.navigate(['/admin']);
            return;
          }
          this.router.navigate(['/dash']);
        } else {
          this.invalidCred = true;
          this.fieldsDisabled = false;
        }
      },
      error: (err)=>{
        console.error(err);
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
        console.log(response);
        if (response["authAPILogin-response"] == "Success") {
          if (response["authToken"] != "") {
            this.cookieService.set("authToken", response["authToken"]);
          }
          console.log(this.cookieService.get("email/phone").toString());
          if (this.cookieService.get("email/phone").toString() === "tatwamasi.admin") {
            this.router.navigate(['/admin']);
            return;
          }
          this.router.navigate(['/dash']);
        }
      },
      error: (err)=>{
        console.error("Login Failed");
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
