import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Plant } from '../plants-info.service';
import { PlantsInfoService } from '../plants-info.service';
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http'
import { CookieService } from 'ngx-cookie-service';
import { NONE_TYPE } from '@angular/compiler';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  constructor(private route: ActivatedRoute, plant_service: PlantsInfoService,
    private router: Router, private http: HttpClient,private cookieService: CookieService){
    this.plant_info_obj = plant_service
  }

  plant_info_obj: any
  plant_details: any
  orders: any[] = []
  order_details: any
  userdetails: any

  isDelivered = false;
  isReady = false;
  isPending = true;

  async ngOnInit(){
    this.plant_info_obj.setEmail(this.cookieService.get("email/phone"))
    this.plant_details = await this.plant_info_obj.getDatabaseDetails()
    this.order_details = await this.plant_info_obj.getOrderList()
    this.userdetails = await this.plant_info_obj.getUserDetails()
    console.log(this.userdetails.user_details.username)
    console.log(this.plant_details)
    this.placeOrder()
  }

  isPresent(id: string) {
    for (let index = 0; index < this.plant_details.length; index++) {
      const plant = this.plant_details[index];
      if (plant.id == id) {
        return index;
      }
    }
    return -1;
  }
  

  placeOrder(){
    let count = 0
    for (let order of this.order_details){
      this.orders.push([{"order_no": order["order_no"]},{"order_date": order["order_date"]}, {"details": []}, {"total_price": 0}, {"invoice_amount": 0}, {"address": order["address"]}, {"status": order["status"]}])
      for (let id of Object.keys(order["order_details"])){
        if(this.isPresent(id) || this.isPresent(id) == 0){
          console.log(id)
          if(Number(id)){
          this.orders[count][3]["total_price"] = this.orders[count][3]["total_price"] + order["order_details"][id]["quantity"] * this.plant_details[this.isPresent(id)].Price
          this.orders[count][2]["details"].push({
            "name": this.plant_details[this.isPresent(id)].Name,
            "price": this.plant_details[this.isPresent(id)].Price,
            "quantity": order["order_details"][id]["quantity"],
            "total_price": order["order_details"][id]["quantity"] * this.plant_details[this.isPresent(id)].Price,
            "img": this.plant_details[this.isPresent(id)].Img_path,
            "type": this.plant_details[this.isPresent(id)].type,
          })
        }}
      }
      this.orders[count][4]["invoice_amount"] = Math.round((this.orders[count][3]["total_price"] * 0.05) + this.orders[count][3]["total_price"])
      count = count + 1
    }
    console.log(this.orders)
  }
}
