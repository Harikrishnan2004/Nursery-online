import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PasswordHandlerService {

  constructor() {}
  private password: string = "";
  setPassword(password: string) {
    this.password = password;
  }

  getPassword(){
    return this.password;
  }
}
