import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-counts',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-counts.component.html',
  styleUrl: './dashboard-counts.component.css'
})
export class DashboardCountsComponent {

  totalDoctors: number = 0;
  totalHappyPatients: number = 0;
  totalStaff: number = 0;
  totalServices: number = 0;

  ngOnInit() {
    this.animateNumber('totalDoctors', 80);
    this.animateNumber('totalHappyPatients', 3500);
    this.animateNumber('totalStaff', 300);
    this.animateNumber('totalServices', 25);
  }

  animateNumber(fieldName: 'totalDoctors' | 'totalHappyPatients' | 'totalStaff' | 'totalServices', targetValue: number) {
    let count = 1;
    const duration = 10000;
    const intervalTime = duration / targetValue;
    const interval = setInterval(() => {
      if (count <= targetValue) {
        (this as any)[fieldName] = count;
        count++;
      } else {
        clearInterval(interval);
      }
    }, intervalTime);
  }
}
