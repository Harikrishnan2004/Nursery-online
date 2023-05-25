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
      if(plant.type == "seed"){
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

  setAddCart(name: string){
    for(let plant of this.plant_details){
      if(plant.Name == name){
        if(plant.Add_to_cart == "Add"){
          console.log("add to added")
          plant.Add_to_cart = "Added"
        }
        else{
          plant.Add_to_cart = "Add"
          console.log("added to add")
        }
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
