import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlantsInfoService {

  constructor() { }

  plant_selected = ""
  plant_details : any = [
    {
      type: "plant",
      Name: "Snake Plant",
      Properties: [
        "Tolerant of low light conditions, making it suitable for shady areas in your home.",
        "Requires infrequent watering, as it is drought-tolerant.",
        "Acts as an air purifier, removing toxins like formaldehyde and benzene."
      ],
      Price: "200₹",
      Scientific_Name: "Sansevieria",
      Img_path: "/assets/images/istockphoto-1018703724-612x612.jpg"
    },

    {
      type: "plant",
      Name: "Spider Plant",
      Properties: [
        "Tolerant of low light conditions, making it suitable for shady areas in your home.",
        "Requires infrequent watering, as it is drought-tolerant.",
        "Acts as an air purifier, removing toxins like formaldehyde and benzene."
      ],
      Price: "150₹",
      Scientific_Name: "Chlorophytum comosum",
      Img_path: "/assets/images/istockphoto-1018703724-612x612.jpg",
    },

    {
      type: "plant",
      Name: "Aloe Vera",
      Properties: [
        "Tolerant of low light conditions, making it suitable for shady areas in your home.",
        "Requires infrequent watering, as it is drought-tolerant.",
        "Acts as an air purifier, removing toxins like formaldehyde and benzene."
      ],
      Price: "150₹",
      Scientific_Name: "Aloe barbadensis",
      Img_path: "/assets/images/istockphoto-1018703724-612x612.jpg",
    },

    {
      type: "seed",
      Name: "Mango",
      Properties: [
        "Tolerant of low light conditions, making it suitable for shady areas in your home.",
        "Requires infrequent watering, as it is drought-tolerant.",
        "Acts as an air purifier, removing toxins like formaldehyde and benzene."
      ],
      Price: "150₹",
      Scientific_Name: "Chlorophytum comosum",
      Img_path: "/assets/images/istockphoto-1018703724-612x612.jpg",
    },

    {
      type: "seed",
      Name: "Lemon",
      Properties: [
        "Tolerant of low light conditions, making it suitable for shady areas in your home.",
        "Requires infrequent watering, as it is drought-tolerant.",
        "Acts as an air purifier, removing toxins like formaldehyde and benzene."
      ],
      Price: "150₹",
      Scientific_Name: "Chlorophytum comosum",
      Img_path: "/assets/images/istockphoto-1018703724-612x612.jpg",
    },

    {
      type: "seed",
      Name: "Orange",
      Properties: [
        "Tolerant of low light conditions, making it suitable for shady areas in your home.",
        "Requires infrequent watering, as it is drought-tolerant.",
        "Acts as an air purifier, removing toxins like formaldehyde and benzene."
      ],
      Price: "150₹",
      Scientific_Name: "Chlorophytum comosum",
      Img_path: "/assets/images/istockphoto-1018703724-612x612.jpg",
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
        if(plant.Name.toLowerCase() == searchName){
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

}
