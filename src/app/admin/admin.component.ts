import { Component, OnInit, HostListener } from '@angular/core';
import { PlantsInfoService } from '../plants-info.service';
import { CookieService } from 'ngx-cookie-service';
import { AdminService } from '../admin.service';

interface OrderDetails {
  [productId: string]: {
    quantity: number;
    name: string;
  };
}

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
  
  segment: number = 0;

  allPlantsData: any = null;
  orderHistory: any = Array();
  pendingOrders: any = null;

  PendingOrdersLoader: boolean = true;
  OrderHistoryLoader: boolean = true;
  verification_bool: boolean = false;
  
  constructor (
    private plantInfo: PlantsInfoService,
    private cookie: CookieService,
    private admin: AdminService
  ) {}

  getOrderItems(orderDetails: OrderDetails): { name: string; quantity: number }[] {
    return Object.values(orderDetails);
  }

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

    this.admin.pendingOrderService(user, authToken).subscribe({
      next: (response: any) => {
        this.pendingOrders = response["pending-orders"];
        this.PendingOrdersLoader = false;
      }
    })

  }

  public setMSG(order_no: string, msg: string) {
    this.admin.changeStatus(this.cookie.get("email/phone"),this.cookie.get("authToken"), order_no, msg).subscribe({
      next: (response: any) => {
        this.getPendingOrders();
      },
      error: (response: any) => {
        alert("error");
      }
    });
  }

  public getOrderHistory(): void {
    this.OrderHistoryLoader = true;
    let user: string = this.cookie.get("email/phone");
    if (user !== "tatwamasi.admin") return;
    let authToken: string = this.cookie.get("authToken");

    this.admin.orderHistoryService(user, authToken, this.segment).subscribe({
      next: (response: any) => {
        this.orderHistory = this.orderHistory.concat(response["order-history"]);
        this.OrderHistoryLoader = false;
      }
    })
  }

  hideAllTabs() {
    this.showManageProductsDiv = false;
    this.showPendingOrdersDiv = false;
    this.showInsightsDiv = false;
    this.showOrderHistoryDiv = false;
    this.segment = 0;
  }
}
