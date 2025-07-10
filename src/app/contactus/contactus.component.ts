import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MainserviceService } from '../service/mainservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contactus',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.css'
})
export class ContactusComponent {

  contactusForm: FormGroup;

  constructor(private fb: FormBuilder, private Service: MainserviceService) {
    this.contactusForm = this.fb.group({
      Name: ['', [Validators.required]],
      EmailID: ['', [Validators.required, Validators.email]],
      PhoneNumber: ['', [Validators.required]],
      Massage: ['']
    });
  }

  get f() {
    return this.contactusForm.controls;
  }

  onSubmit(): void {
    if (this.contactusForm.valid) {
      const contactUs = this.contactusForm.value;
      this.Service.AddContactUs(contactUs).subscribe(
        (response) => {
          console.log('ContactUs created successfully:', response);
          Swal.fire({
            title: 'Success!',
            text: 'ContactUs created successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          this.contactusForm.reset();
        },
        (error) => {
          console.error('Error creating ContactUs:', error);
          Swal.fire({
            title: 'Error!',
            text: 'An error occurred while creating the ContactUs. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      );
    } else {
      Object.keys(this.contactusForm.controls).forEach(field => {
        const control = this.contactusForm.get(field);
        control?.markAsTouched();
      });
    }
  }
}
