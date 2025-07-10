import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MainserviceService } from '../service/mainservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private Service : MainserviceService, private router: Router) {
    this.signupForm = this.fb.group({
      Name: ['', [Validators.required]],
      UserName: ['', [Validators.required, Validators.minLength(4)]],
      EmailID: ['', [Validators.required, Validators.email]],
      PhoneNumber: ['', [
        Validators.required,
        Validators.pattern(/^\d{10}$/)
      ]],
      Password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('.*[A-Z].*'),
        Validators.pattern('.*[!@#$%^&*(),.?":{}|<>].*')
      ]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatcher });
  }

  passwordMatcher(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('Password');
    const confirmPassword = group.get('confirmPassword');
    return password && confirmPassword && password.value !== confirmPassword.value
      ? { 'match': true }
      : null;
  }

  restrictPhoneNumber(event: any): void {
    const input = event.target.value;
    event.target.value = input.replace(/\D/g, '').slice(0, 10);
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const { confirmPassword, ...userData } = this.signupForm.value;
      this.Service.AddUserDetails(userData).subscribe(
        (response) => {
          if (response.status) {
            Swal.fire({
              title: 'Success!',
              text: response.message,
              icon: 'success',
              confirmButtonText: 'OK'
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['/Login']); 
              }
            });
            this.signupForm.reset();
          } else {
            Swal.fire({
              title: 'Error!',
              text: response.message,
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        },
        (error) => {
          console.error('Error creating user:', error);
          Swal.fire({
            title: 'Error!',
            text: 'An unexpected error occurred. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      );
    } else {
      Object.keys(this.signupForm.controls).forEach(field => {
        const control = this.signupForm.get(field);
        control?.markAsTouched();
      });
    }
  }   

  get f() {
    return this.signupForm.controls;
  }

}
