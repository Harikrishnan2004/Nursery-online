import { Component } from '@angular/core';
import { PlantsInfoService } from '../plants-info.service';
import { Router } from "@angular/router"
import { Plant } from '../plants-info.service';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  plant_service_obj : any 
  user_detail : any
  user_name = ""
  user_mail = ""
  edit_bool = false
  edit_innerHTML = "Edit"
  save_innerHTML = "Save"

  constructor(private router: Router, plant_service: PlantsInfoService, private http: HttpClient,
    private cookieService: CookieService){
    this.plant_service_obj = plant_service;
  }

  async ngOnInit(){
    this.user_detail = await this.plant_service_obj.getUserDetails(this.cookieService.get("email/phone"))
    this.getEmail()
    this.getUsername()
  }

  getEmail(){
    this.user_mail = this.user_detail["user_details"]["email"]
    console.log(this.user_mail)
  }
  getUsername(){
    this.user_name = this.user_detail["user_details"]["username"]
  }

  makeEditable(){
    if (this.edit_bool){
      this.edit_bool = false
      this.edit_innerHTML = "Edit"
    }
    else{
      this.edit_bool = true
      this.edit_innerHTML = "Editable"
      this.save_innerHTML = "Save"
    }
  }

  async saveChanges(username: string, usermail: string){
    if(this.edit_bool){
      this.save_innerHTML = "Save"
    }
    else{
      this.plant_service_obj.saveprofile(username, usermail)
      this.user_detail = await this.plant_service_obj.getUserDetails(this.cookieService.get("email/phone"))
      this.save_innerHTML = "Saved"
    }
  }

  logOut(){
    this.cookieService.set("email/phone", "")
    this.router.navigate(['/home'])
  }
}
