import { Component, HostListener } from '@angular/core';
import { CartViewComponent } from '../cart-view/cart-view.component';
import { PlantsInfoService } from '../plants-info.service';

declare var Razorpay: any;

@Component({
  selector: 'app-razorpay',
  templateUrl: './razorpay.component.html',
  styleUrls: ['./razorpay.component.css']
})
export class RazorpayComponent {

  constructor(cartView: CartViewComponent, plant_info_service: PlantsInfoService){
    this.cartViewComponent = cartView
    this.plant_info_service_obj = plant_info_service
  }

  plant_info_service_obj: any
  cartViewComponent: any

  message:string = "Not yet stared";
  paymentId = "";
  error = "";
  title = 'Tatwamasi Plants and Seeds';
  options = {
    "key": "rzp_test_OqOdmZvXdG2YDt",
    "amount": "200",
    "name": "Tatwamasi Plants and Seeds",
    "description": "Online-Nursery",
    "image": "/assets/images/logo.jpg",
    "order_id": "",
    "handler": function (response: any) {
      var event = new CustomEvent("payment.success",
        {
          detail: response,
          bubbles: true,
          cancelable: true
        }
      );
      window.dispatchEvent(event);
    },
    "prefill": {
      "name": "Tatwamasi Plants and Seeds",
      "email": "",
      "contact": ""
    },
    "notes": {
      "address": ""
    },
    "theme": {
      "color": "#3399cc"
    }
  };

  paynow() {
    this.paymentId = '';
    this.error = '';
    this.options.amount = (this.plant_info_service_obj.getInvoiceTotal() * 100).toString(); //paise
    this.options.prefill.name = "Hari";
    this.options.prefill.email = "abijash2731@gmail.com";
    this.options.prefill.contact = "9999999999";
    var rzp1 = new Razorpay(this.options);
    rzp1.open();
    rzp1.on('payment.failed',  (response: any) => {
      this.message = "Payment Failed";
      // Todo - store this information in the server
      console.log(response.error.code);
      console.log(response.error.description);
      console.log(response.error.source);
      console.log(response.error.step);
      console.log(response.error.reason);
      console.log(response.error.metadata.order_id);
      console.log(response.error.metadata.payment_id);
      //this.error = response.error.reason;
    }
    );
  }


  @HostListener('window:payment.success', ['$event'])
  onPaymentSuccess(event: any): void {
    this.message = "Success Payment";
    this.plant_info_service_obj.updatePaymentSuccess()
    console.log("success")
  }

}
