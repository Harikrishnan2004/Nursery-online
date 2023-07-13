import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Plant } from '../plants-info.service';
import { PlantsInfoService } from '../plants-info.service';
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http'
import { CookieService } from 'ngx-cookie-service';

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

  cart_details: any = {}
  plant_info_obj: any
  plant_details: any

  async ngOnInit(){
    this.plant_info_obj.setEmail(this.cookieService.get("email/phone"))
    this.cart_details = await this.plant_info_obj.getCartDetails()
    this.plant_details = await this.plant_info_obj.getDatabaseDetails()
  }
}
