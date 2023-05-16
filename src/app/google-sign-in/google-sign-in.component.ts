import { Component } from '@angular/core';

@Component({
  selector: 'app-google-sign-in',
  templateUrl: './google-sign-in.component.html',
  styleUrls: ['./google-sign-in.component.css']
})
export class GoogleSignInComponent {

  ngOnInit(): void {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }

  handleCredentialResponse(response : any): void {
    const responsePayload = this.decodeJwtResponse(response.credential);

    console.log("ID: " + responsePayload.sub);
    console.log('Full Name: ' + responsePayload.name);
    console.log('Given Name: ' + responsePayload.given_name);
    console.log('Family Name: ' + responsePayload.family_name);
    console.log("Image URL: " + responsePayload.picture);
    console.log("Email: " + responsePayload.email);

  }
  decodeJwtResponse(data: string): any {
    const tokens = data.split('.');
    const base64Payload = tokens[1];
    const decodedPayload = this.base64Decode(base64Payload);
    return JSON.parse(decodedPayload);
  }

  base64Decode(input: string): string {
    const decodedString = window.atob(input);
    return decodedString;
  }

}

