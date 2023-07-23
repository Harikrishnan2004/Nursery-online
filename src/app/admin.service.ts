import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  public pendingOrderService(user: string, authToken: string) {
    return this.http.post("http://127.0.0.1:8000/tatadmin/getPendingOrders/", {
      "user": user,
      "auth": authToken
    });
  }

  public orderHistoryService(user: string, authToken: string, segment: number) {
    return this.http.post("http://127.0.0.1:8000/tatadmin/getAllOrders/", {
      "user": user,
      "auth": authToken,
      "segment": segment
    });
  }

  public changeStatus(user: string, authToken: string, ord_no: string, msg: string) {
    return this.http.post("http://127.0.0.1:8000/tatadmin/updateStatus/", {
      "user": user,
      "auth": authToken,
      "order_no": ord_no,
      "update_message": msg
    });
  }

}
