import { Component, OnInit } from '@angular/core';
import { PlantsInfoService } from '../plants-info.service';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http"
import { GetCsrfService } from '../get-csrf.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-add-plant',
  templateUrl: './add-plant.component.html',
  styleUrls: ['./add-plant.component.css']
})
export class AddPlantComponent implements OnInit {
// Inside your component

  public addNewProduct: boolean = true;
  public modifyExistingProduct: boolean = false;

  public allPlantsData: any;

  Type = ""
  Name = ""
  Properties = ""
  InitialQuantity = ""
  Price = ""
  ScientificName = ""
  Quantity = 1
  AddToCart = "Add"
  ImageBase64 = ""
  PlantServiceObj: any


  constructor(private plant_service: PlantsInfoService,private cookieService: CookieService, private csrfService: GetCsrfService, private router: Router, private http: HttpClient){
    this.PlantServiceObj = plant_service
  }

  ngOnInit(): void {
    this.plant_service.getDatabaseDetails().then(data => {
      data.forEach((element: any) => {
        element.editable = false;
      });
      this.allPlantsData = data;
      console.log(data);
    });

  }

  public hideAllTabs(): void {
    this.addNewProduct = false;
    this.modifyExistingProduct = false;
  }

  handleFileInput(event: any) {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result as string;
        this.ImageBase64 = base64String
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
      this.http.post("http://127.0.0.1:8000/details/setDetails/", {
        "type": this.Type,
        "name": this.Name,
        "sname": this.ScientificName,
        "price": this.Price,
        "properties": this.Properties,
        "quantity": this.Quantity,
        "initialQuantity": this.InitialQuantity,
        "img": this.ImageBase64,
        "addToCart": this.AddToCart
      }).subscribe({
        next: (response: any) => {
          console.log(response)
        },
        error: (err) => {
          console.log(err)
        }
      })
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

  setUpdatedInfo(type: String, name: string, price: string, properties: string, sname: string, id: string){
    let csrfToken: any
    this.csrfService.getNewCsrf().subscribe({
      next: (response: any) => {
        csrfToken = response["csrf"]
        console.log(csrfToken)
        this.http.post("http://127.0.0.1:8000/details/update/", {
          admin_mail: this.PlantServiceObj.getEmail(),
          id: id,
          csrf: csrfToken,
          auth: this.cookieService.get("authToken"),
          update_name: name,
          update_type: type,
          update_properties: properties,
          update_sname: sname,
          update_price: parseInt(price),
        }).subscribe({
          next: (response)=>{
            console.log(response)
          }
        })
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

}
