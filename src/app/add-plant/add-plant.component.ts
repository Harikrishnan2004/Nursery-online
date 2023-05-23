import { Component } from '@angular/core';
import { PlantsInfoService } from '../plants-info.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-plant',
  templateUrl: './add-plant.component.html',
  styleUrls: ['./add-plant.component.css']
})
export class AddPlantComponent {
// Inside your component

  Type = ""
  Name = ""
  Properties = ""
  InitialQuantity = ""
  Price = ""
  ScientificName = ""
  Quantity = 0
  AddToCart = "Add"
  ImageBase64 = ""
  PlantServiceObj: any


  constructor(plant_service: PlantsInfoService, private router: Router){
    this.PlantServiceObj = plant_service
  }

  handleFileInput(event: any) {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result as string;
        this.ImageBase64 = base64String
        console.log(base64String)
      };

      reader.readAsDataURL(file);
    }
  }

  getDetails(type: string, name: string, sname: string, price:string, properties:string, initialQ: string){
    if(type && name && properties && price && initialQ && sname){
      this.InitialQuantity = initialQ
      this.Name = name
      this.Price = price
      this.ScientificName = sname
      this.Properties = properties
      this.Type = type

      const plantDetails = {
        type: type,
        Name: name,
        Properties: properties,
        Price: Number(price),
        Scientific_Name: sname,
        Img_path: this.ImageBase64,
        Initial_quantity: Number(initialQ),
        Quantity: 1,
        Add_to_cart: "Add"
      }

      console.log(type, name, properties, price, initialQ, sname)
      this.PlantServiceObj.setPlantDetails(this.Type, this.Name, this.ScientificName, this.Price, this.Properties, this.InitialQuantity, this.ImageBase64)
      this.router.navigate(["/dash"])

      this.InitialQuantity = ""
      this.Name = ""
      this.Price = ""
      this.ScientificName = ""
      this.Properties = ""
      this.Type = ""
    }
    else{
      alert("Fill all the details")
      return
    }
  }

  getName(value: string){
    this.Name = value
  }
  getInitialQ(value: string){
    this.InitialQuantity = value
  }
  getPrice(value: string){
    this.Price = value
  }
  getSname(value: string){
    this.ScientificName = value
  }
  getType(value: string){
    this.Type = value
  }
  getProperties(value: string){
    this.Properties = value
  }

}
