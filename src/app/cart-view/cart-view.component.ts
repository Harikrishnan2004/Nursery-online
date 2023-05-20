import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Plant } from '../plants-info.service';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent {

  constructor(private route: ActivatedRoute){}

  cart_details: Plant[] = []

  ngOnInit(){
    this.route.queryParams.subscribe(params => {
      this.cart_details = JSON.parse(JSON.parse(params["cartDetails"]))
      console.log(this.cart_details)
    })
  }

  calcTotal(name: string){
    let total = 0;
    for(let plant of this.cart_details){
      if(plant.Name == name){
        total = plant.Quantity * plant.Price
        console.log(total)
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
    return total
  }
}
