/* admin/admin-register/admin-register.component.ts */

import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

function confirmPasswordValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (!confirmPassword) {
    return null; /* If confirmPassword control doesn't exist, skip validation */
  }
  
  if (!confirmPassword.value) {
    return { 'confirmPasswordRequired': true };
  }
  
  if (password && confirmPassword && password.value !== confirmPassword.value) {
    return { 'passwordMismatch': true };
  }
  
  return null;
}



function adminUserIdValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const adminUserId = control.get('admin_username');

  if (adminUserId && !/^[a-zA-Z]+$/.test(adminUserId.value)) {
  
    return { 'invalidAdminUserId': true };
  }

  return null;
}


@Component({
  selector: 'admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.scss']
})
export class AdminRegisterComponent implements OnInit {
  registerForm: FormGroup;
  isDarkModeActive: boolean = false;
  registrationSuccess: boolean = false;
registrationFail: any;
  
  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.registerForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      middle_name: [''],
      last_name: ['', Validators.required],
      birthday: ['', Validators.required],
      gender: ['', Validators.required ],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      role: ['admin_user', [Validators.required]],
      admin_username: ['', [Validators.required, adminUserIdValidator]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, );
    
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Form Data:', this.registerForm.value);
  
      /* Send the form data to the backend */
      this.http.post<any>('http://localhost:4000/admin/admin-register', this.registerForm.value)
        .subscribe(
          response => {
            console.log('API Response:', response);
            this.registrationSuccess = true;
          },
          error => {
            console.error('API Error:', error);
          }
        );
    }
  }
}
