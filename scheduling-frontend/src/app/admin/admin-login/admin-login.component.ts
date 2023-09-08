/* app/admin/admin-login/admin-login.component.ts */

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})

  export class AdminLoginComponent implements OnInit {
  
  authForm!: FormGroup;
  loginSuccessful: boolean = false;
  loginFailed: boolean = false;
  isSubmitted: boolean = false;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.authForm = new FormGroup({
      admin_username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, Validators.required)
    });
  }

  get formControls(): { [key: string]: AbstractControl } {
    return this.authForm.controls;
  }

  // Function to handle form submission
  signIn() {
    this.isSubmitted = true;

    if (this.authForm.invalid) {
      return;
    }

    const admin_username = this.authForm.value.admin_username;
    const password = this.authForm.value.password;

    this.login(admin_username, password);
  }

  /* Dummy example email and password for demonstration purposes */
  exampleUserId = "example1";
  examplePassword = "admin123";

  /* Your login function */
  login(admin_username: string, password: string) {
    console.log("Login method invoked.");
    console.log(`admin_username: ${admin_username}, Password: ${password}`); 
   
    const loginPayload = {
      admin_username: admin_username,
      password: password
    };

    this.httpClient.post('http://localhost:4000/admin/admin-login', loginPayload).subscribe(
      (response: any) => { 
        this.loginSuccessful = true;
        this.loginFailed = false;
        console.log("Login successful!", response);
      },
      (error) => {  
        this.loginSuccessful = false;
        this.loginFailed = true;
        console.log("Login failed!", error);
      }
    );
  }
}
