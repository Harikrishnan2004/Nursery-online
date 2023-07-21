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

}
