import { Component, OnInit } from '@angular/core';
import { PlantsInfoService } from '../plants-info.service';
import { ActivatedRoute } from '@angular/router';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-plant-view',
  templateUrl: './plant-view.component.html',
  styleUrls: ['./plant-view.component.css']
})
export class PlantViewComponent implements OnInit{

  plantService: any
  selectedPlant = ""
  dashboard: any
  plantQuantity = ""

  plantScientificName = ""
  plantProperties = []
  plantRate = ""
  plantType = ""

  constructor(p: PlantsInfoService, private route: ActivatedRoute){
    this.plantService = p;
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.selectedPlant = params['selectedPlant']
      this.getDetails()
    })
  }

  getDetails(){
    for(let plant of this.plantService.plant_details){
      if(plant.Name == this.selectedPlant){
        this.plantScientificName = plant.Scientific_Name
        this.plantProperties = plant.Properties
        this.plantRate = plant.Price
        this.plantType = plant.type
        this.plantQuantity = plant.Initial_quantity
      }
    }

    console.log(this.plantType)
  }

}
