import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  constructor(private router: Router){

  }
  moveToSignUp(){
    this.router.navigate(['/signup'])
  }

  moveToLogin(){
    this.router.navigate(['/login'])
  }

  moveToAbout(){

  }

  moveToLocation(){
    this.router.navigate(['/location'])
  }

  moveToDash(){
    this.router.navigate(['/dash'])
  }
}
