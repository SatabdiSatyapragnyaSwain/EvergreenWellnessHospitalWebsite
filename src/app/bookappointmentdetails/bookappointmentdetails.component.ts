import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainserviceService } from '../service/mainservice.service';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-bookappointmentdetails',
  standalone: true,
  imports: [[MatTableModule, MatInputModule, MatButtonModule, FormsModule, ReactiveFormsModule, CommonModule, MatPaginatorModule]],
  templateUrl: './bookappointmentdetails.component.html',
  styleUrl: './bookappointmentdetails.component.css'
})

export class BookappointmentdetailsComponent {

  userID: string | null = '';

  displayedColumns: string[] = ['Name', 'DOB', 'Gender', 'EmailID', 'PhoneNumber', 'AppointmentDate', 'AppointmentTime', 'DepartmentName', 'DoctorName', 'Status', 'Action'];
  dataSource!: MatTableDataSource<any>;

  constructor(private Service: MainserviceService, private route: ActivatedRoute) { }

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('MatSort') MatSort!: MatSort;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.userID = params['userID'];
      if (this.userID) {
        this.getAppointmentDetails(this.userID);
      }
    });
  }

  getAppointmentDetails(userID: string) {
    this.Service.GetAppointmentDetails(userID).subscribe(
      (response: any) => {
        if (response.status) {
          this.dataSource = new MatTableDataSource<any>(response.data);
          this.dataSource.sort = this.MatSort;
          this.dataSource.paginator = this.paginator;
        } else {
          Swal.fire({
            icon: 'error',
            title: 'No Appointment Details',
            text: response.message || 'No appointment details found.',
          });
        }
      },
      (error) => {
        console.error('Error fetching appointment details:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while fetching appointment details.',
        });
      }
    );
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Pending':
        return 'status-pending';
      case 'Booked':
      case 'Completed':
        return 'status-booked';
      case 'Canceled':
        return 'status-canceled';
      default:
        return '';
    }
  }

}
