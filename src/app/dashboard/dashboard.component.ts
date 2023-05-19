import { Component } from '@angular/core';
import { PlantsInfoService } from '../plants-info.service';
import { Router } from "@angular/router"

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  plant_details: any
  plant_service_obj: any
  cartNumber = 0
  no_results_found = false
  selectedPlant = ""

  constructor(private router: Router, plant_service: PlantsInfoService){
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

  handleEntryKey(event: any, value: string){
    let plantDet: any
    if (event.key === "Enter") {
      plantDet = this.plant_service_obj.getSearchDetails(value.toLowerCase());
      this.plant_details = plantDet.plant_List
      this.no_results_found = plantDet.no_Results_found
    }
  }

  setSelectedPlant(name: string){
    this.selectedPlant = name
    this.router.navigate(["/plant-view"], { queryParams: {selectedPlant : name}}  );
  }

  valueInc(name: string){
    this.plant_service_obj.quantityInc(name)
    console.log("inc")
  }

  valueDec(name: string){
    this.plant_service_obj.quantityDec(name)
    console.log("dec")
  }

  moveToHome(){
    this.router.navigate(['/home'])
  }
}
