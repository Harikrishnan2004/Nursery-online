import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Plant } from '../plants-info.service';
import { PlantsInfoService } from '../plants-info.service';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent {

  constructor(private route: ActivatedRoute, plant_service: PlantsInfoService){
    this.plant_info_obj = plant_service
  }

  cart_details: Plant[] = []
  plant_info_obj: any

  ngOnInit(){
    this.cart_details = this.plant_info_obj.getCartDetails()
  }

  calcTotal(name: string){
    let total = 0;
    for(let plant of this.cart_details){
      if(plant.Name == name){
        total = plant.Quantity * plant.Price
        return total
      }
    }
    return 0
  }

  calcGrandTotal(){
    let total = 0;
    for(let plant of this.cart_details){
      total = total + Number(plant.Price) * Number(plant.Quantity)
    }
    return total + this.calcGST()
  }

  calcGST(){
    let total = 0;
    let GST_Percent = 0.05
    for(let plant of this.cart_details){
      total = total + Number(plant.Price) * Number(plant.Quantity)
    }
    return total * GST_Percent
  }

  calcInvoiceTotal(){
    return Math.round(this.calcGrandTotal())
  }
}
