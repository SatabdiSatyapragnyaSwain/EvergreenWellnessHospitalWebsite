import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainserviceService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  //Logout Part Start
  isLoggedIn(): boolean {
    return sessionStorage.getItem('IslogedIn') === 'True';
  }

  logout(): void {
    sessionStorage.removeItem('IslogedIn');
  }
  //Logout Part End

  //Login and SignIn Api Start
  GetAllUsers(UserName: any, Password: any) {
    const params = new HttpParams()
      .set('UserName', UserName)
      .set('Password', Password);
    return this.http.get(`${this.apiUrl}/LoginUsers`, { params });
  }  
  
  AddUserDetails(User: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/UserDetailsCreation`, User);
  }

  AddDoctorDetails(Doctor: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/DoctorDetailsCreation`, Doctor);
  }
  
  //Login and SignIn Api End 

  
  // Appointment API call Start

  GetAllDepartment() {
    return this.http.get(`${this.apiUrl}/GetDepartmentDetails`);
  }

  GetDoctorsDetails(DepartmentID: any): Observable<any> {
    const params = new HttpParams().set('DepartmentID', DepartmentID);
    return this.http.get(`${this.apiUrl}/GetDoctorsDetails`, { params });
  }

  AddAppointment(appointment: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/AppointmentCreation`, appointment);
  }

  GetAppointmentDetails(UserID: any) {
    const params = new HttpParams()
      .set('UserID', UserID);
    return this.http.get(`${this.apiUrl}/GetAppointmentDetails`, { params });
  }

  // Appointment API call End

  // ContactUs API call Start

  AddContactUs(contactUs: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/ContactUsCreation`, contactUs);
  }

  // ContactUs API call End

}
