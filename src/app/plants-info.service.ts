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
  plant_details : any

  getDetails(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.post("http://127.0.0.1:8000/details/getDetails/", {
        message: "send"
      }).subscribe({
        next: (response: any) => {
          this.plant_details = response["plantDetails"];
          resolve(this.plant_details); // Resolve the promise with plant_details
        },
        error: (error: any) => {
          reject(error); // Reject the promise with the error
        }
      });
    });
  }

  setAddCart(name: string, Id: number){
    this.http.post("http://127.0.0.1:8000/details/addCartUpdate/", {id: Id}).subscribe({
      next: (response)=>{
        console.log(response)
      },
      error: (error)=>{
        console.log(error)
      }
    })
  }

  async getPlantDetails(){
    let plantDetails = await this.getDetails()
    let plantList: any[] = []
    for(let plant of plantDetails){
      if(plant.type.toLowerCase() == "plant"){
        plantList.push(plant)
      }
    }
    return plantList
  }

  async getSeedDetails(){
    let plantDetails = await this.getDetails()
    let plantList: any[] = []
    for(let plant of plantDetails){
      if(plant.type == "seed"){
        plantList.push(plant)
      }
    }
    return plantList
  }

  async getSearchDetails(value: string){


    this.plant_details = await this.getDetails()
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

  quantityInc(name: String){
    for(let plant of this.plant_details){
      if(plant.Name == name){
        console.log()
        plant.Quantity = plant.Quantity + 1
        break
      }
    }
  }

  quantityDec(name: String){
    for(let plant of this.plant_details){
      if(plant.Name == name && plant.Quantity != 1){
        plant.Quantity = plant.Quantity - 1
        break
      }
    }
  }

  setCartDetails(details: {}[]){
    this.cartDetails = details
    console.log(this.cartDetails)
  }

  getCartDetails(){
    return this.cartDetails
  }

  setCartNumber(value: number){
    this.cartNumber = value
  }
  getCartNumber(){
    return this.cartNumber
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
