import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-dialog',
  standalone: true,
  templateUrl: './signup-dialog.component.html',
  styleUrls: ['./signup-dialog.component.css']
})
export class SignupDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<SignupDialogComponent>, 
    private router: Router
  ) {}

  navigateAndClose(route: string): void {
    this.router.navigate([route]); // Navigate to the route
    this.dialogRef.close(); // Close the dialog
  }
}
