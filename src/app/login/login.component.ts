import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";
import { Router } from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: String = ""
  emailOrPhone: String = ""
  password: String = ""

  passwordType: String = "password"
  pass_check: Boolean = false

  userDetails: {}[] = []

  constructor(private http: HttpClient, private router: Router){

  }

  getDetails(un: String, e: String, p: String){

    const password_check: string[] = ["!","@","#","$","%","^","&","*","(",")",".",",","/","\",","{","}","|","~","`"]

    if(un.length > 5){
      if(e.length > 10){
        if(p.length > 8 && p.length < 12){
          for(const char of password_check){
            if(p.includes(char)){
              this.pass_check = true
              break
            }
          }
          if(this.pass_check){
            this.username = un;
            this.emailOrPhone = e;
            this.password = p;
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


    if(this.username && this.emailOrPhone && this.password){
      if(this.password){
        this.http.post("http://127.0.0.1:8000/api/signup/", {email: this.emailOrPhone, username: this.username, password: this.password}).subscribe({
          next: (response: any)=>{
            console.log(response)
            if(response["Status"] == "Success"){

            }
            else{
              alert("Invalid login credentials")
              return
            }
          },
          error: (err)=>{
            alert("Invalid email or phone number");
            return
          }
        }
        )
        this.username = "";
        this.emailOrPhone = "";
        this.password = "";
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
