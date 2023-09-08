/* client/client-register/client-register.component.ts */


import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

function clientIdValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const clientId = control.get('client_username');
  
  if (clientId && !/^[a-zA-Z]+$/.test(clientId.value)) {
    return { 'invalidClientUsername': true };
  }
  
  return null;
}

@Component({
  selector: 'client-register',
  templateUrl: './client-register.component.html',
  styleUrls: ['./client-register.component.scss']
})
export class ClientRegisterComponent implements OnInit {
  registerForm: FormGroup;
  registrationSuccess: boolean = false;
  isDarkModeActive: any;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.registerForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      middle_name: [''],
      last_name: ['', Validators.required],
      birthday: ['', Validators.required], 
      gender: ['', Validators.required],
      street: ['', Validators.required],
      unitapptnumber: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postal_code: ['', Validators.required],
      country: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
      company_school: [''],
      client_username: ['', [Validators.required, clientIdValidator]], /* Apply the clientIdValidator here */
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['']
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Form is valid');
      console.log('Form Data:', this.registerForm.value);

      // Send the form data to the backend
      this.http.post<any>('http://localhost:4000/client/client-register', this.registerForm.value)
      .subscribe(
        response => {
          console.log('API Response:', response);
          this.registrationSuccess = true;
        },
        error => {
          console.error('API Error:', error);
        }
      );
    } else {
      console.log('Form is not valid');
    }
  }
}
