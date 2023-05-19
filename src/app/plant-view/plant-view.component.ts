import { Component } from '@angular/core';
import { PlantsInfoService } from '../plants-info.service';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-plant-view',
  templateUrl: './plant-view.component.html',
  styleUrls: ['./plant-view.component.css']
})
export class PlantViewComponent {

  plantService: any
  selectedPlant = ""
  dashboard: any

  plantScientificName = ""
  plantProperties = []
  plantRate = ""
  plantType = ""

  constructor(p: PlantsInfoService, d: DashboardComponent){
    this.plantService = p;
    this.dashboard = d;
  }

  ngAfterViewInit() {
    this.selectedPlant = this.dashboard.getSelectedPlant()
    console.log(this.selectedPlant)
    this.getDetails();
  }

  getDetails(){
    for(let plant of this.plantService.plant_details){
      if(plant.Name == this.selectedPlant){
        this.plantScientificName = plant.Scientific_Name
        this.plantProperties = plant.Properties
        this.plantRate = plant.Price
        this.plantType = plant.type
      }
    }

    console.log(this.plantType)
  }

}
