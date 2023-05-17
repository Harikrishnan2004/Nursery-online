import { Component } from '@angular/core';
import { PlantsInfoService } from '../plants-info.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  plant_details: any
  plant_service_obj: any
  cartNumber = 0

  constructor(plant_service: PlantsInfoService){
    this.plant_details = plant_service.getDetails();
    this.plant_service_obj = plant_service;
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

  addToCart(){
    this.cartNumber = this.cartNumber + 1
  }

  remove(){
    if(this.cartNumber != 0){
      this.cartNumber = this.cartNumber - 1
    }
  }
}
