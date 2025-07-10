import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MainserviceService } from '../service/mainservice.service';
import Swal from 'sweetalert2';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-bookappointment',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './bookappointment.component.html',
  styleUrls: ['./bookappointment.component.css']
})
export class BookappointmentComponent {

  userID: string | null = localStorage.getItem('UserID');

  appointmentForm: FormGroup;
  Department: any;
  Doctors: any;

  constructor(private fb: FormBuilder, private Service: MainserviceService) {
    this.appointmentForm = this.fb.group({
      FirstName: ['', [Validators.required]],
      LastName: ['', [Validators.required]],
      DateOfBirth: ['', [Validators.required]],
      Gender: ['', [Validators.required]],
      Address: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.email]],
      Phone: ['', [Validators.required]],
      PreferredDate: ['', [Validators.required]],
      PreferredTime: ['', [Validators.required]],
      Department: ['', [Validators.required]],
      Doctor: ['', [Validators.required]],
      AdditionalMessage: ['']
    });

    // Get doctors when the department changes
    this.appointmentForm.get('Department')?.valueChanges.subscribe(departmentId => {
      if (departmentId) {
        this.getDoctorsDetails(departmentId);
      }
    });
  }

  ngOnInit() {
    this.getDepartmentDetails();
  }

  get f() {
    return this.appointmentForm.controls;
  }

  onSubmit(): void {
    if (this.appointmentForm.valid) {
      const appointment = this.appointmentForm.value;

      // Retrieve the UserID from localStorage
      const userID = localStorage.getItem('UserID');
      if (userID) {
        appointment.UserID = userID;
      }

      this.Service.AddAppointment(appointment).subscribe(
        (response) => {
          console.log('Appointment created successfully:', response);
          Swal.fire({
            title: 'Success!',
            text: 'Appointment created successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          this.appointmentForm.reset();
        },
        (error) => {
          console.error('Error creating appointment:', error);
          Swal.fire({
            title: 'Error!',
            text: 'An error occurred while creating the appointment. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      );
    } else {
      Object.keys(this.appointmentForm.controls).forEach(field => {
        const control = this.appointmentForm.get(field);
        control?.markAsTouched();
      });
    }
  }

  getDepartmentDetails() {
    this.Service.GetAllDepartment().subscribe(
      (response) => {
        this.Department = response;
        console.log('Departments:', this.Department);
      },
      (error) => {
        console.error('Error fetching departments:', error);
      }
    );
  }

  getDoctorsDetails(DepartmentID: any) {
    this.Service.GetDoctorsDetails(DepartmentID).subscribe(
      (response) => {
        this.Doctors = response;
        console.log('Doctors:', this.Doctors);
      },
      (error) => {
        console.error('Error fetching Doctors:', error);
      }
    );
  }
}
