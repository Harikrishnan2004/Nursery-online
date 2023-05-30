import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})

export class PlantsInfoService {

  constructor(private http: HttpClient) { }

  plant_selected = "";
  cartDetails: {}[] = []
  cartNumber = 0;
  PlantDatabase: any
  plant_details : any
  dataFetched = false
  Email = ""

  setEmail(email: string){
    this.Email = email
    console.log(this.Email)
  }

  getEmail(){
    return this.Email
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
