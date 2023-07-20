import { Component } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-info-footer',
  templateUrl: './info-footer.component.html',
  styleUrls: ['./info-footer.component.css']
})
export class InfoFooterComponent {
  constructor(private route: Router){}

  moveToAdmin(){
    this.route.navigate(['/admin'])
  }
}
