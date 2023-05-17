import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-google-sign-in',
  templateUrl: './google-sign-in.component.html',
  styleUrls: ['./google-sign-in.component.css']
})
export class GoogleSignInComponent implements OnInit {

  makeRed: boolean = false;
  constructor(private http: HttpClient, private cookieService: CookieService,
    private router: Router) {}

  ngOnInit(): void {
    // @ts-ignore
    google.accounts.id.initialize({
      client_id: "829309063059-62n8osovkljiguccn24fmt2kmeaoohf9.apps.googleusercontent.com",
      callback: this.handleCredentialResponse.bind(this),
      auto_select: false,
      cancel_on_tap_outside: true,

    });
    // @ts-ignore
    google.accounts.id.renderButton(
      // @ts-ignore
      document.getElementById("google-button"),
      { theme: "outline", size: "large", width: "100%" }
    );
    // @ts-ignore
    google.accounts.id.prompt((notification: PromptMomentNotification) => { });
  }

  handleCredentialResponse(response: any) {
    // Here will be your response from Google.
    console.log(response);
    this.loginGoogleUser(this.decodeJwtResponse(response["credential"]))
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

  loginGoogleUser(data: any) {
    this.http.post("http://127.0.0.1:8000/auth/OAuth2/", {
      "OAuth2_key": data["aud"],
      "email": data["email"],
      "name": data["name"],
      "sub": data["sub"]
    }).subscribe({
      next: (response: any) => {
        if (response["authAPIOAuth2-response"] == "Success") {
          this.cookieService.set("authToken", response["authToken"]);
          this.cookieService.set("email/phone", data["email"]);
          this.router.navigate(["/dash"]);
        } else {
          alert("Google Signin did not work");
        }
      },

      error: (error: any) => {
        console.error(error);
      }
    })
  }

}
