import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminService } from '../admin_service/admin.service';


@Component({
  templateUrl: './doctor-view.component.html',
  styleUrls: ['./doctor-view.component.css']
})
export class DoctorViewComponent implements OnInit {
  constructor(private service: AdminService) {
    this.getPatientDetails();
  }
  patientDetails: any;
  count!: any;
  patientData!:any;
  ngOnInit(): void {
  }
  //To list the appointments of patients
  getPatientDetails() {
    const id = localStorage.getItem('doctorId');
    this.service.getPatient(id).subscribe(res => {
      this.patientDetails = res;
      console.log("Hello", res);
      this.count = this.patientDetails.length;
    })
  }
  findPatient(patient: any) {
    console.log(patient);
    this.service.patientHistory(patient).subscribe(res => {
      this.patientData = res;
      console.log(res);
    })
  }
}

