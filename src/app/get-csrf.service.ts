import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class GetCsrfService {

  private csrf: string = "";
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getNewCsrf() {
    return this.http.post("http://127.0.0.1:8000/auth/csrf/", {
      "email/phone": this.cookieService.get("email/phone")
    })
  }
}
