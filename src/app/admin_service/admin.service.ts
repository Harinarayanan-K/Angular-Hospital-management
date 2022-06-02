import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

//admin,doctor and patient services defined here

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) { }
  header = {

    "Content-Type": "application/json",
    "Authorization": "Contacts " + localStorage.getItem("accesstoken"),
  }

  postDoctor(data: any) {
    console.log("hello");

    return this.http.post<any>("http://localhost:8080/user/add", data, { "headers": this.header }).pipe(map((res) => {
      return res;
      console.log(res);
    }
    ))
  }
  getDoctor() {
    return this.http.get<any>("http://localhost:8080/user/list").pipe(map((res) => {
      return res;
    }))
  }
  deleteDoctor(userId: number): Observable<any> {
    console.log(userId);
    return this.http.delete<any>("http://localhost:8080/user/delete/" + userId, { "headers": this.header })
  }
  listDepartment() {
    return this.http.get("http://localhost:8080/patient/listDepartment")
  }

  listDoctor(department: any) {
    console.log(department);

    return this.http.get("http://localhost:8080/patient/listDoctors/" + department)
  }
  checkTime(time: any) {
    return this.http.get("http://localhost:8080/patient/checkTime/" + time)
  }
  listTime(dates: any, doctorid: number) {
    return this.http.get("http://localhost:8080/patient/listTime/", { params: { "dates": dates, "doctorId": doctorid } })
  }
  postPatient(data: any) {
    return this.http.post("http://localhost:8080/patient/book", data);
  }
  getPatient(id: any) {
    return this.http.get("http://localhost:8080/user/patientList/" + id, { "headers": this.header })
  }
  updateDoctor(doctorid: any, data: any) {
    console.log("hello", data);

    return this.http.put("http://localhost:8080/user/edit/" + doctorid, data, { "headers": this.header })
  }
  find(doctorName: any) {
    return this.http.get("http://localhost:8080/user/findDoctor/" + doctorName, { "headers": this.header })
  }
  patientHistory(patient: any) {
    return this.http.get("http://localhost:8080/patient/patientHistory/" + patient)
  }

}     
