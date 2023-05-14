import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from "rxjs";
import { Router } from "@angular/router"

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent {

  OTP: string = ""

  constructor(private http: HttpClient, private router: Router){}

  move(e: any, previous: any, present: any, next: any){
    var length = present.value.length;
    var max_length = present.getAttribute('maxlength');
    console.log(length, max_length)
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

  verify(no1: string, no2: string, no3: string, no4: string){
    this.OTP = this.OTP.concat(no1, no2, no3, no4);
    console.log(this.OTP);

    this.http.post("http://127.0.0.1:8000/api/otp/",{OTP: this.OTP}).subscribe({
      next: (response: any)=>{
        console.log(JSON.stringify(response))
        if(response['Status'] == 'Success'){
          this.router.navigate(['login'])
        }
        else{
          alert("Invalid OTP");
          return;
        }
      },
      error: (err)=>{
        alert("Invalid OTP");
        return;
      }
    })

    this.OTP = ""

  }
}
