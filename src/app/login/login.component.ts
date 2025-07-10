import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MainserviceService } from '../service/mainservice.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { SignupDialogComponent } from '../signup-dialog/signup-dialog.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private router: Router, private service: MainserviceService, private fb: FormBuilder, private dialog: MatDialog) {
    this.loginForm = this.fb.group({
      UserName: ['', Validators.required],
      Password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void { }

  Login() {
    if (this.loginForm.invalid) {
      return;
    }
    const userName = this.loginForm.value.UserName;
    const password = this.loginForm.value.Password;
    this.service.GetAllUsers(userName, password).subscribe(
      (response: any) => {
        console.log(response);
        if (response.status && response.message === 'Login successful') {
          if (response.data && response.data.length > 0) {
            const userID = response.data[0].UserID;
            localStorage.setItem("UserID", userID);
            sessionStorage.setItem("IslogedIn", "True");
            Swal.fire({
              title: 'Login Successful',
              text: 'You have successfully logged in!',
              icon: 'success',
              confirmButtonText: 'OK'
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['/Home/dashboard']);
              }
            });
          } else {
            console.log('User logged in, but no additional data provided.');
          }
        } else {
          Swal.fire({
            title: 'Login Failed',
            text: response.message || 'Invalid credentials. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      },
      (error) => {
        Swal.fire({
          title: 'Error',
          text: 'An error occurred during login. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    );
  }
  
  get f() {
    return this.loginForm.controls;
  }

  openSignUpDialog(): void {
    this.dialog.open(SignupDialogComponent, {
      width: 'max-content',
      data: {}
    });
  }
}
