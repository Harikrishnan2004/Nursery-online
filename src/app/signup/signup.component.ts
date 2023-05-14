import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";
import { Router } from "@angular/router"

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username: String = ""
  firstName: String = ""
  lastName: String = ""
  emailOrPhone: String = ""
  password: String = ""
  conformPassword: String =""

  passwordType: String = "password"
  pass_check: Boolean = false

  userDetails: {}[] = []

  constructor(private http: HttpClient, private router: Router){

  }

  getDetails(un: String, fn: String, ln: String, e: String, p: String, cp: String){

    const password_check: string[] = ["!","@","#","$","%","^","&","*","(",")",".",",","/","\",","{","}","|","~","`"]

    if(un.length > 5){
      if(e.length >= 10){
        if(p.length > 8 && p.length < 12 && cp.length > 8 && cp.length < 12){
          for(const char of password_check){
            if(p.includes(char)){
              this.pass_check = true
              break
            }
          }
          if(this.pass_check){
            this.username = un;
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
    }
    else{
      alert("No of characters in the username must be greater than 5")
      return
    }


    if(this.username && this.firstName && this.lastName && this.emailOrPhone && this.password && this.conformPassword){
      if(this.password === this.conformPassword){
        this.http.post("http://127.0.0.1:8000/api/signup/", {email: this.emailOrPhone, username: this.username, first_name: this.firstName, last_name: this.lastName, password: this.password}).subscribe({
          next: (response: any)=>{
            console.log(response)
            if(response["status"] == "Success"){
              this.router.navigate(['/otp'])
            }
          },
          error: (err)=>{
            alert("Invalid email or phone number");
            return
          }
        }
        )
        this.userDetails.push({key: this.username, value: [this.firstName, this.lastName, this.emailOrPhone, this.password, this.conformPassword]})
        this.username = "";
        this.firstName = "";
        this.lastName = "";
        this.emailOrPhone = "";
        this.password = "";
        this.conformPassword = "";
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

    console.log(this.userDetails)

  }

  getUsername(value: String){
    this.username = value
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

