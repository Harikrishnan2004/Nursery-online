import { Component } from '@angular/core';
import { PlantsInfoService } from '../plants-info.service';
import { Router } from "@angular/router"
import { Plant } from '../plants-info.service';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {

  cart_details: any = {}
  plant_details: any
  plant_service_obj: any
  cartNumber = 0
  no_results_found = false
  selectedPlant = ""
  account_name = ""

  constructor(private router: Router, plant_service: PlantsInfoService, private http: HttpClient,
    private cookieService: CookieService){
    this.plant_service_obj = plant_service;
  }

  async ngOnInit(){
    if(!this.plant_service_obj.getDataFetched()){
      await this.plant_service_obj.getDatabaseDetails()
    }
    this.plant_details = this.plant_service_obj.getDetails();
    this.plant_service_obj.setEmail(this.cookieService.get("email/phone"))
    this.cart_details = await this.plant_service_obj.setCartDetails()
    this.cartNumber = Object.keys(this.cart_details).length
  }

  dropDownSelect(value: string){
    console.log(value)
    if(value == "Plants"){
      this.plant_details = this.plant_service_obj.getPlantDetails()
    }
    else if(value == "Seeds"){
      this.plant_details = this.plant_service_obj.getSeedDetails()
    }
    else{
      this.plant_details = this.plant_service_obj.getDetails();
    }
  }

  addToCart(id: number){
    this.http.post("http://127.0.0.1:8000/auth/cartFunction/", {
      function: "add",
      email: this.plant_service_obj.getEmail(),
      plant_id: id
    }).subscribe({
      next: async (response:any)=>{
        console.log(response)
        if(response["status"] == "plant added"){
          this.cart_details = await this.plant_service_obj.setCartDetails()
          this.cartNumber = Object.keys(this.cart_details).length
        }
      }
    })
  }

  moveToProfile(){
    this.router.navigate(['/profile'])
  }

  getCartNumber(){
    return this.cartNumber
  }

  async remove(id: number){
    this.http.post("http://127.0.0.1:8000/auth/cartFunction/", {
      function: "remove",
      email: this.plant_service_obj.getEmail(),
      plant_id: id
    }).subscribe({
      next: async (response: any)=>{
        console.log(response)
        if(response["status"] == "plant removed"){
          this.cart_details = await this.plant_service_obj.setCartDetails()
          this.cartNumber = Object.keys(this.cart_details).length
        }
      }
    })
  }

  async handleEntryKey(value: string){
    let plantDet: any
    try{
      plantDet = await this.plant_service_obj.getSearchDetails(value.toLowerCase());
    }
    catch (error){
      console.log(error)
    }
    this.plant_details = plantDet.plant_list
    this.no_results_found = plantDet.no_Results_Found
    console.log(plantDet.no_results_found)
  }

  moveToCart(){
    const JsonCartDetails = JSON.stringify(this.cart_details)
    this.router.navigate(['/cart-view'])
  }

  setSelectedPlant(name: string){
    this.selectedPlant = name
    this.router.navigate(["/plant-view"], { queryParams: {selectedPlant : name}}  );
  }

  async valueInc(id: string){
    this.http.post("http://127.0.0.1:8000/auth/cartFunction/", {
      function: "increment",
      email: this.plant_service_obj.getEmail(),
      plant_id: id
    }).subscribe({
      next: async (response: any)=>{
        console.log(response)
        if(response["status"] == "incremented"){
          this.cart_details = await this.plant_service_obj.setCartDetails()
        }
      }
    })
  }

  async valueDec(id: string){
    if(this.cart_details[id][0] >= 1){
      this.http.post("http://127.0.0.1:8000/auth/cartFunction/", {
        function: "decrement",
        email: this.plant_service_obj.getEmail(),
        plant_id: id
      }).subscribe({
        next: async (response: any)=>{
          console.log(response)
          if(response["status"] == "decremented"){
            this.cart_details = await this.plant_service_obj.setCartDetails()
          }
        }
      })
    }
  }

  getQuantity(id: string){
    if(this.cart_details[id]){
      return this.cart_details[id][0]
    }
    else{
      return 1
    }
  }

  addCartText(id: string){
    if(this.cart_details[id]){
      return this.cart_details[id][1]
    }
    else{
      return "Add"
    }
  }

  moveToOrders(){
    this.router.navigate(["/my-orders"])
  }

  moveToHome(){
    this.router.navigate(['/home'])
  }

  getAccountName(){
    this.account_name = this.cookieService.get("email/phone")
    return this.account_name[0].toUpperCase()
  }
}
