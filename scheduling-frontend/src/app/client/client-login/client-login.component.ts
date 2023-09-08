/* app/client/client-login/client-login.component.ts */


import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service'; // Assuming this is where your AuthService resides

@Component({
  selector: 'client-login',
  templateUrl: './client-login.component.html',
  styleUrls: ['./client-login.component.scss']
})
export class ClientLoginComponent implements OnInit {
  authForm: FormGroup;
  loginSuccessful: boolean = false;
  loginFailed: boolean = false;
  isSubmitted: boolean = false;

  constructor(private httpClient: HttpClient, private router: Router, private authService: AuthService) {
    this.authForm = new FormGroup({
      client_username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
    // ... (existing code)
  }

  get formControls(): { [key: string]: AbstractControl } {
    return this.authForm.controls;
  }

  signIn() {
    this.isSubmitted = true;
    if (this.authForm.invalid) {
      return;
    }
    const client_username = this.authForm.value.client_username;
    const password = this.authForm.value.password;
    this.login(client_username, password);
  }

  login(client_username: string, password: string) {
    console.log("Login method invoked.");
    const loginPayload = {
      client_username: client_username,
      password: password
    };

    this.httpClient.post('http://localhost:4000/client/client-login', loginPayload).subscribe(
      (response: any) => { 
        this.loginSuccessful = true;
        this.loginFailed = false;
        localStorage.setItem('token', response.token);  
        console.log("Login successful!", response);

        // Navigate to client dashboard
        this.router.navigate(['/client/client-dashboard']);
      },
      (error) => {  
        this.loginSuccessful = false;
        this.loginFailed = true;
        console.log("Login failed!", error);
      }
    );
  }
}
