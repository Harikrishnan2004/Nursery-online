import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Plant } from '../plants-info.service';
import { PlantsInfoService } from '../plants-info.service';
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http'
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent {

  InvoiceTotal = 0
  EachProductTotal: any = {}
  EachProductQuantity: any = {}
  TotalQuantity = 0
  EachProductPrice: any = {}
  Orders: any =  []
  plantDetails: any

  constructor(private route: ActivatedRoute, plant_service: PlantsInfoService,
    private router: Router, private http: HttpClient,private cookieService: CookieService){
    this.plant_info_obj = plant_service
  }

  cart_details: any = {}
  plant_info_obj: any

  async ngOnInit(){
    this.plant_info_obj.setEmail(this.cookieService.get("email/phone"))
    this.cart_details = await this.plant_info_obj.getCartDetails()
    this.plantDetails = await this.plant_info_obj.getDatabaseDetails()
  }

  isPresent(id: number){
    for(let plant_id of Object.keys(this.cart_details)){
      if(parseInt(plant_id) == id){
        return true
      }
    }
    return false
  }

  goToDash(){
    this.router.navigate(['\dash'])
  }

  calcTotal(name: string){
    let total = 0;
    for(let plant of this.plantDetails){
      if(plant.Name == name && this.isPresent(plant.id)){
        total = this.getQuantity(plant.id) * plant.Price
        this.EachProductPrice[plant.Name] = plant.Price
        this.EachProductTotal[plant.Name] = total
        return total
      }
    }
    return 0
  }

  calcTotalQuantity(){
    let total = 0;
    try{
      for(let plant of this.plantDetails){
        if(this.isPresent(plant.id)){
        total = total + this.getQuantity(plant.id)
        this.EachProductQuantity[plant.Name] = this.getQuantity(plant.id)
      }
      }
    }
    catch(error){}
    this.TotalQuantity = total
    return total
  }

  calcGrandTotal(){
    let total = 0;
    try{
    for(let plant of this.plantDetails){
      if(this.isPresent(plant.id)){
      total = total + Number(plant.Price) * Number(this.getQuantity(plant.id))
    }}}catch(error){}
    return total + this.calcGST()
  }

  calcGST(){
    let total = 0;
    let GST_Percent = 0.05
    try{
    for(let plant of this.plantDetails){
      if(this.isPresent(plant.id)){
      total = total + Number(plant.Price) * Number(this.getQuantity(plant.id))
    }}}catch(error){}
    return total * GST_Percent
  }

  calcInvoiceTotal(){
    this.InvoiceTotal = Math.round(this.calcGrandTotal())
    return this.InvoiceTotal
  }

  getQuantity(id: string){
    if(this.cart_details[id]){
      return this.cart_details[id][0]
    }
  }

  getStringQuantity(id: string){
    if(this.cart_details[id]){
      return "Quantity: ".concat(this.cart_details[id][0].toString())
    }
    else{
      return "Quantity: "
    }
  }
}

//   setOrderDetails(){
//     let email = this.plant_info_obj.getEmail()
//     this.http.post("http://127.0.0.1:8000/details/setOrderDetails/",{
//       Orders: this.Orders,
//       Quantity: this.EachProductQuantity,
//       Username: email,
//       Price_Each: this.EachProductPrice,
//       Total_Price: this.InvoiceTotal,
//       Total_Quantity: this.TotalQuantity,
//     }).subscribe({
//       next: (response)=>{
//         console.log(response)
//       },
//       error: (error)=>{
//         console.log(error)
//       }
//     })
//   }
// }
