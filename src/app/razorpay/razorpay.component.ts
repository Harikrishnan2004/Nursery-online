import { Component } from '@angular/core';
import { PaymentService, RazorpayOrder, RazorpayPayment } from '../payment.service';
import { PlantsInfoService } from '../plants-info.service';
import { Router } from '@angular/router';

declare var Razorpay: any;

@Component({
  selector: 'app-razorpay',
  templateUrl: './razorpay.component.html',
  styleUrls: ['./razorpay.component.css']
})
export class RazorpayComponent {
  private razorpayKeyId: string = "rzp_test_1cVlhv1wrmqNK9";
  public razorpayOrder: RazorpayOrder | undefined;

  constructor(
    private razorpay: PaymentService,
    private plantsInfo: PlantsInfoService,
    private router: Router
  ) {}

  public pay(): void {
    this.razorpay.createNewOrder(this.plantsInfo.getInvoiceTotal() * 100)
    .subscribe((data: RazorpayOrder) => {
      this.razorpayOrder = { ...data };
      this.initRazorpay();
    });
  }

  private initRazorpay(): void {
    const razorpayOptions = {
      "key": this.razorpayKeyId,
      "amount": this.razorpayOrder?.amount,
      "currency": this.razorpayOrder?.currency,
      "name": "Tatwamasi",
      "image": "assets/images/logo.png",
      "description": `Payment towards ${this.razorpayOrder?.id}` ,
      "order_id": this.razorpayOrder?.id,
      "handler": (response: RazorpayPayment) => {
        this.razorpay.verifyPaymentStatus(response)
          .subscribe(async (data: any) => {
            if (data["status"] === "razorpay-payment-signature-verified") {
              await this.plantsInfo.updatePaymentSuccess(
                response["razorpay_order_id"],
                response["razorpay_payment_id"],
                response["razorpay_signature"],
                this.plantsInfo.getInvoiceTotal().toString()
              );
              this.router.navigate(['/my-orders']);
            }
          })
      }
    };

    var rzp = new Razorpay(razorpayOptions);
    rzp.on('payment.failed', (response: any) => {
      console.log("Payment Failed");
      console.log(response);
    });
    rzp.open();
  }
}
