import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class PlantsInfoService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  plant_selected = "";
  cartDetails: {[key: string]: any} = {}
  cartNumber = 0;
  PlantDatabase: any
  plant_details : any
  dataFetched = false
  Email = ""
  order_details: {[key: string]: {[key: string]: any}} = {}
  InvoiceTotal = 0

  setEmail(email: string){
    this.Email = email
    console.log(this.Email)
  }

  setInvoiceTotal(total: number){
    this.InvoiceTotal = total
  }

  getInvoiceTotal(){
    return this.InvoiceTotal
  }

  getEmail(){
    let email = this.cookieService.get("email/phone")
    this.setEmail(email)
    return this.Email
  }

  saveprofile(user_name: string, user_mail: string): Promise<any>{
    return new Promise<any>((resolve, reject) => {
      this.http.post("http://127.0.0.1:8000/auth/userFunction/", {
        function: "save changes",
        email: user_mail,
        username: user_name,
        auth: this.cookieService.get("authToken")
      }).subscribe({
        next: (response: any) => {
          console.log(response)
          resolve(response)
        },
        error: (err: any) => {
          console.log(err)
          reject(err)
        }
      })
    })
  }

  getUserDetails(email: string): Promise<any>{
    return new Promise<any>((resolve, reject) => {
      this.http.post("http://127.0.0.1:8000/auth/userFunction/", {
        function: "send user details",
        email: this.getEmail()
      }).subscribe({
        next: (response: any) => {
          console.log(response)
          resolve(response)
        },
        error: (err: any) => {
          console.log(err)
          reject(err)
        }
      })
    })
  }

  
  getOrderList(email: string): Promise<any>{
    return new Promise<any>((resolve, reject) => {
      this.http.post("http://127.0.0.1:8000/auth/userFunction/", {
        function: "send order list",
        email: this.getEmail()
      }).subscribe({
        next: (response: any) => {
          console.log(response)
          resolve(response["order_list"])
        },
        error: (err: any) => {
          console.log(err)
          reject(err)
        }
      })
    })
  }

  setCartDetails(): Promise<any>{
    return new Promise<any>((resolve, reject) => {
      this.http.post("http://127.0.0.1:8000/auth/cartFunction/", {
        function: "send cart details",
        email: this.getEmail()
      }).subscribe({
        next: (response: any) => {
          console.log(response["cart_plants"])
          this.cartDetails = response["cart_plants"]
          resolve(this.cartDetails)
        },
        error: (error) => {
          console.log(error)
          reject(error);
        }
      })
    })
  }

  getCartDetails(): Promise<any>{
    return new Promise<any>((resolve, reject) => {
      this.http.post("http://127.0.0.1:8000/auth/cartFunction/", {
        function: "send cart details",
        email: this.getEmail()
      }).subscribe({
        next: (response: any) => {
          console.log(response["cart_plants"])
          resolve(response["cart_plants"])
        },
        error: (error) => {
          console.log(error)
          reject(error);
        }
      })
    })
  }

  getDatabaseDetails(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.post("http://127.0.0.1:8000/details/getDetails/", {
        message: "send"
      }).subscribe({
        next: (response: any) => {
          this.PlantDatabase = response["plantDetails"];
          this.plant_details = this.PlantDatabase
          this.dataFetched = true
          resolve(this.plant_details); // Resolve the promise with plant_details
        },
        error: (error: any) => {
          reject(error); // Reject the promise with the error
        }
      });
    });
  }

  getDataFetched(){
    return this.dataFetched
  }

  getDetails(){
    console.log(this.plant_details)
    return this.plant_details
  }

  getPlantDetails(){
    let plantDetails = this.plant_details
    let plantList: any[] = []
    for(let plant of plantDetails){
      if(plant.type.toLowerCase() == "plant"){
        plantList.push(plant)
      }
    }
    return plantList
  }

  getSeedDetails(){
    let plantDetails = this.plant_details
    let plantList: any[] = []
    for(let plant of plantDetails){
      if(plant.type.toLowerCase() == "seed"){
        plantList.push(plant)
      }
    }
    return plantList
  }

  getSearchDetails(value: string){

    let plantList: any[] = []
    let searchName = value.toLowerCase()
    let NoResultsFound = false

    if(value){
      for(let plant of this.plant_details){
        plantList = []
        const plantName = plant.Name.toLowerCase()
        if(plantName.startsWith(searchName))
        {
          plantList.push(plant)
          NoResultsFound = false
          break
        }
        else{
          plantList = this.plant_details;
          NoResultsFound = true
        }
      }
    }
    else{
      plantList = this.plant_details;
    }
    console.log(plantList)
    return {"plant_list": plantList, "no_Results_Found": NoResultsFound}
  }

  async isPresent(id: number){
    this.cartDetails = await this.getCartDetails()
    for(let plant_id of Object.keys(this.cartDetails)){
      if(parseInt(plant_id) == id){
        return true
      }
    }
    return false
  }

  placeOrder(order_details: any){
    this.http.post("http://127.0.0.1:8000/auth/userFunction/",{
      function: "place order",
      orders: order_details,
      email: this.getEmail(), 
      auth: this.cookieService.get("authToken")
    }).subscribe({
      next: (response)=>{
        console.log(response)
      },
      error: (error)=>{
        console.log(error)
      }
    })
  }

  async updatePaymentSuccess(){
    this.cartDetails = await this.getCartDetails()
    for(let plant of this.plant_details){
      if(await this.isPresent(plant.id)){
        this.order_details[plant.id] = {
          "quantity": this.cartDetails[plant.id][0]
        } 
      }
    }
    this.placeOrder(this.order_details)
  }


}

export interface Plant {
  id: number;
  type: string;
  Name: string;
  Properties: string[];
  Price: number;
  Scientific_Name: string;
  Img_path: string;
  Initial_quantity: number;
  Quantity: number;
  Add_to_cart: string;
}
