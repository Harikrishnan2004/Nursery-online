import { Component } from '@angular/core';
import { PlantsInfoService } from '../plants-info.service';
import { Router } from "@angular/router"
import { Plant } from '../plants-info.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {

  cart_details: Plant[] = []
  plant_details: any
  plant_service_obj: any
  cartNumber = 0
  no_results_found = false
  selectedPlant = ""

  constructor(private router: Router, plant_service: PlantsInfoService){
    this.plant_service_obj = plant_service;
  }

  async ngOnInit(): Promise<void>{
    try {
      this.plant_details = await this.plant_service_obj.getDetails();
      console.log(this.plant_details);
      // Use plantDetails here
    } catch (error) {
      console.error(error);
    }
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

  addToCart(name: string){
    this.cart_details = this.plant_service_obj.getCartDetails()
    this.cartNumber = this.plant_service_obj.getCartNumber()
    for(let plant of this.plant_details){
      if(plant.Name == name && !this.cart_details.includes(plant)){
        this.cartNumber = this.cartNumber + 1
        this.cart_details.push(plant)
        this.plant_service_obj.setAddCart(name)
        this.plant_service_obj.setCartDetails(this.cart_details)
        this.plant_service_obj.setCartNumber(this.cartNumber)
        return
      }
    }
  }

  getCartNumber(){
    return this.plant_service_obj.getCartNumber()
  }

  remove(name: string){
    this.cart_details = this.plant_service_obj.getCartDetails()
    this.cartNumber = this.plant_service_obj.getCartNumber()
    for(let plant of this.cart_details){
      if(plant.Name == name){
        if(this.cartNumber != 0){
          this.cartNumber = this.cartNumber - 1
          this.plant_service_obj.setAddCart(name)
          this.cart_details = this.cart_details.filter((plant) => plant.Name != name);
          this.plant_service_obj.setCartDetails(this.cart_details)
          this.plant_service_obj.setCartNumber(this.cartNumber)
          return
        }
      }
    }
  }

  handleEntryKey(value: string){
    let plantDet: any
    plantDet = this.plant_service_obj.getSearchDetails(value.toLowerCase());
    this.plant_details = plantDet.plant_List
    this.no_results_found = plantDet.no_Results_found
  }

  moveToCart(){
    const JsonCartDetails = JSON.stringify(this.cart_details)
    this.router.navigate(['/cart-view'], {queryParams: {cartDetails: JSON.stringify(JsonCartDetails)}})
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
