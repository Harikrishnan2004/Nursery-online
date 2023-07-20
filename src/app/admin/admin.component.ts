import { Component, OnInit } from '@angular/core';
import { PlantsInfoService } from '../plants-info.service';
import { CookieService } from 'ngx-cookie-service';
import { GetCsrfService } from '../get-csrf.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  showManageProductsDiv: boolean = true;
  showPendingOrdersDiv: boolean = false;
  showOrderHistoryDiv: boolean = false;
  showInsightsDiv: boolean = false;

  allPlantsData: any = null;
  pendingOrders: any = null;
  orderHistory: any = null;

  PendingOrdersLoader: boolean = true;
  OrderHistoryLoader: boolean = true;
  verification_bool: boolean = false;
  
  constructor (
    private plantInfo: PlantsInfoService,
    private cookie: CookieService,
    private csrf: GetCsrfService
  ) {}

  ngOnInit() {
    const user = this.cookie.get("email/phone") 
    if (user == "tatwamasi.admin"){
      this.verification_bool = true
    }
    else{
      this.verification_bool = false
    }
    this.plantInfo.getDatabaseDetails().then(data => {
      this.allPlantsData = data;
    });
  }

  public getPendingOrders(): void {
    this.PendingOrdersLoader = true;
    let user: string = this.cookie.get("email/phone");
    if (user !== "tatwamasi.admin") return;
    let authToken: string = this.cookie.get("authToken");
    // !! get csrf before any transactions
    // http get request using admin privileges
    this.pendingOrders = [{"dummy": "data"}];
    this.PendingOrdersLoader = false;
  }

  public getOrderHistory(): void {
    this.OrderHistoryLoader = true;
    let user: string = this.cookie.get("email/phone");
    if (user !== "tatwamasi.admin") return;
    let authToken: string = this.cookie.get("authToken");

    // this.csrf.getNewCsrf().subscribe({
    //   next: (response: any) => {
    //     if (response[""])
    //   }
    // })

    this.orderHistory = [{"dummy": "data"}];
    this.OrderHistoryLoader = false;
  }

  hideAllTabs() {
    this.showManageProductsDiv = false;
    this.showPendingOrdersDiv = false;
    this.showInsightsDiv = false;
    this.showOrderHistoryDiv = false;
  }
}
