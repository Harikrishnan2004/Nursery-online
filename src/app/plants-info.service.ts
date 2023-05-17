import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlantsInfoService {

  constructor() { }
  plant_details : any = [
    {
      type: "plant",
      Name: "Snake Plant",
      Properties: "Tolerant of low light conditions, making it suitable for shady areas in your home. \nRequires infrequent watering, as it is drought-tolerant. \nActs as an air purifier, removing toxins like formaldehyde and benzene.",
      Price: "200₹",
      Scientific_Name: "Sansevieria"
    },

    {
      type: "plant",
      Name: "Spider Plant",
      Properties: "Tolerant of low light conditions, making it suitable for shady areas in your home. \nRequires infrequent watering, as it is drought-tolerant. \nActs as an air purifier, removing toxins like formaldehyde and benzene.",
      Price: "150₹",
      Scientific_Name: "Chlorophytum comosum"
    },

    {
      type: "plant",
      Name: "Aloe Vera",
      Properties: "Tolerant of low light conditions, making it suitable for shady areas in your home. \nRequires infrequent watering, as it is drought-tolerant. \nActs as an air purifier, removing toxins like formaldehyde and benzene.",
      Price: "150₹",
      Scientific_Name: "Aloe barbadensis"
    },

    {
      type: "seed",
      Name: "Mango",
      Properties: "Tolerant of low light conditions, making it suitable for shady areas in your home. \nRequires infrequent watering, as it is drought-tolerant. \nActs as an air purifier, removing toxins like formaldehyde and benzene.",
      Price: "150₹",
      Scientific_Name: "Chlorophytum comosum"
    },

    {
      type: "seed",
      Name: "Lemon",
      Properties: "Tolerant of low light conditions, making it suitable for shady areas in your home. \nRequires infrequent watering, as it is drought-tolerant. \nActs as an air purifier, removing toxins like formaldehyde and benzene.",
      Price: "150₹",
      Scientific_Name: "Chlorophytum comosum"
    },

    {
      type: "seed",
      Name: "Orange",
      Properties: "Tolerant of low light conditions, making it suitable for shady areas in your home. \nRequires infrequent watering, as it is drought-tolerant. \nActs as an air purifier, removing toxins like formaldehyde and benzene.",
      Price: "150₹",
      Scientific_Name: "Chlorophytum comosum"
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
}
