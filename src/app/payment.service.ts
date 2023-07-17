import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface RazorpayOrder {
  id: string;
  entity: string;
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string;
  offer_id: any;
  status: string;
  attempts: number;
  notes: any;
  created_at: number
}

export interface RazorpayPayment {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private createNewOrderURL: string = "http://localhost:8000/rzpay/order/";
  private verifyPaymentURL: string = "http://localhost:8000/rzpay/verify/";
  constructor(private http: HttpClient) { }

  public createNewOrder(amount: number) {
    return this.http.post<RazorpayOrder>(this.createNewOrderURL, {
      'amount': amount
    });
  }

  public verifyPaymentStatus(paymentResponse: RazorpayPayment) {
    return this.http.post(this.verifyPaymentURL, paymentResponse);
  }
}
