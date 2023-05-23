import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class PlantsInfoService {

  constructor() { }

  plant_selected = "";
  cartDetails: {}[] = []
  cartNumber = 0;
  plant_details : any = [
    {
      type: "plant",
      Name: "Snake Plant",
      Properties: [
        "Tolerant of low light conditions, making it suitable for shady areas in your home.",
        "Requires infrequent watering, as it is drought-tolerant.",
        "Acts as an air purifier, removing toxins like formaldehyde and benzene."
      ],
      Price: 200,
      Scientific_Name: "Sansevieria",
      Img_path: "/assets/images/plant-photos/snake_plant.jpg",
      Initial_quantity: 1,
      Quantity: 1,
      Add_to_cart: "Add"
    },

    {
      type: "plant",
      Name: "Spider Plant",
      Properties: [
        "Tolerant of low light conditions, making it suitable for shady areas in your home.",
        "Requires infrequent watering, as it is drought-tolerant.",
        "Acts as an air purifier, removing toxins like formaldehyde and benzene."
      ],
      Price: 150,
      Scientific_Name: "Chlorophytum comosum",
      Img_path: "/assets/images/plant-photos/spider_plant.jpg",
      Initial_quantity: 1,
      Quantity: 1,
      Add_to_cart: "Add"
    },

    {
      type: "plant",
      Name: "Aloe Vera",
      Properties: [
        "Tolerant of low light conditions, making it suitable for shady areas in your home.",
        "Requires infrequent watering, as it is drought-tolerant.",
        "Acts as an air purifier, removing toxins like formaldehyde and benzene."
      ],
      Price: 150,
      Scientific_Name: "Aloe barbadensis",
      Img_path: "/assets/images/plant-photos/aloe_vera.jpg",
      Initial_quantity: 1,
      Quantity: 1,
      Add_to_cart: "Add"

    },

    {
      type: "seed",
      Name: "Mango",
      Properties: [
        "Tolerant of low light conditions, making it suitable for shady areas in your home.",
        "Requires infrequent watering, as it is drought-tolerant.",
        "Acts as an air purifier, removing toxins like formaldehyde and benzene."
      ],
      Price: 150,
      Scientific_Name: "Chlorophytum comosum",
      Img_path: "/assets/images/plant-photos/mango.jpg",
      Initial_quantity: 1,
      Quantity: 1,
      Add_to_cart: "Add"
    },

    {
      type: "seed",
      Name: "Lemon",
      Properties: [
        "Tolerant of low light conditions, making it suitable for shady areas in your home.",
        "Requires infrequent watering, as it is drought-tolerant.",
        "Acts as an air purifier, removing toxins like formaldehyde and benzene."
      ],
      Price: 150,
      Scientific_Name: "Chlorophytum comosum",
      Img_path: "/assets/images/plant-photos/lemon.jpg",
      Initial_quantity: 1,
      Quantity: 1,
      Add_to_cart: "Add"
    },

    {
      type: "seed",
      Name: "Orange",
      Properties: [
        "Tolerant of low light conditions, making it suitable for shady areas in your home.",
        "Requires infrequent watering, as it is drought-tolerant.",
        "Acts as an air purifier, removing toxins like formaldehyde and benzene."
      ],
      Price: 150,
      Scientific_Name: "Chlorophytum comosum",
      Img_path: "/assets/images/plant-photos/orange.jpg",
      Initial_quantity: 1,
      Quantity: 1,
      Add_to_cart: "Add"
    }

  ]

  getDetails(){
    return this.plant_details
  }

  getPlantDetails(){
    let plantList: any[] = []
    for(let plant of this.plant_details){
      if(plant.type == "plant"){
        plantList.push(plant)
      }
    }
    return plantList
  }

  getSeedDetails(){
    let plantList: any[] = []
    for(let plant of this.plant_details){
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
        if(plantName == searchName ||
        searchName.split(" ").includes(plantName) ||
        plantName.split(" ").includes(searchName))
        {
          plantList = [plant]
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
    return {plant_List: plantList, no_Results_found: NoResultsFound}
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

  setPlantDetails(type: string, name: string, sname: string, price:string, properties:string, initialQ: string, img: string){
    const plantDetails = {
      type: type,
      Name: name,
      Properties: properties,
      Price: Number(price),
      Scientific_Name: sname,
      Img_path: img,
      Initial_quantity: Number(initialQ),
      Quantity: 1,
      Add_to_cart: "Add"
    }
    this.plant_details.push(plantDetails)
    console.log(this.plant_details)
  }
}

export interface Plant {
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
