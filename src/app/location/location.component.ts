import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent {
    constructor(private router: Router){

    }
    moveToHome(){
      this.router.navigate(['/home'])
    }
}
