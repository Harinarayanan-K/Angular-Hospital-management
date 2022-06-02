import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin_service/admin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { patientModule } from './patient-module';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import htmlcanvas from 'html2canvas'
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-patient-view',
  templateUrl: './patient-view.component.html',
  styleUrls: ['./patient-view.component.css']
})

export class PatientViewComponent implements OnInit {
  departments!: any;
  doctors!: any;
  appointment!: any;
  apptimes!: Array<string>;
  booked = false;
  patientModuleObj: patientModule = new patientModule();
  doctorId!: any;
  patientData!: any;
  id!: any;
  constructor(private admin: AdminService, private fb: FormBuilder, private rt: Router) {
    admin.listDepartment().subscribe(res => {
      this.departments = res;
    })
  }
  ngOnInit(): void {
  }
  patientForm = this.fb.group({
    patientName: ['', [Validators.required]],
    gender: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$")]],
    phoneNumber: ['', [Validators.required, Validators.pattern(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/)]],
    department: ['', Validators.required],
    doctorId: ['', Validators.required],
    appointmentDate: ['', Validators.required],
    time: ['', Validators.required],
  });

  //Patient booking Function

  postPatientDetails() {
    if (this.patientForm.invalid) {
      alert("invalid")
      return;
    }
    this.dates(this.patientForm.value.appointmentDate, this.doctorId);
    this.patientModuleObj.patientName = this.patientForm.value.patientName;
    this.patientModuleObj.gender = this.patientForm.value.gender;
    this.patientModuleObj.email = this.patientForm.value.email;
    this.patientModuleObj.phoneNumber = this.patientForm.value.phoneNumber;
    this.patientModuleObj.department = this.patientForm.value.department;
    this.patientModuleObj.doctorId = this.patientForm.value.doctorId;
    this.patientModuleObj.appointmentDate = this.patientForm.value.appointmentDate;
    this.patientModuleObj.time = this.patientForm.value.time;
    let time = this.patientModuleObj.time;
    let flag = 0;
    console.log(time);
    this.apptimes.forEach((value) => {
      if (value == time) {
        alert(time + "AM  is already reserved");
        flag = 1;
      }
    })
    if (flag == 0) {
      this.admin.postPatient(this.patientModuleObj).subscribe(res => {
        this.patientForm.reset();
        alert("Hi Your slot is booked");
      });
    }
  }
  // list doctors when select department
  onChange(e: any) {
    let department = e.value;
    console.log(department);
    this.admin.listDoctor(department).subscribe(res => {
      this.doctors = res;
      console.log(this.doctors);
    })
  }
  //to check the slot availability when click the time
  availTime(time: any) {
    time = time.value;
    console.log(time);
    this.apptimes.forEach((value) => {
      if (time == value) {
        alert(time + " is already reserved")
      }
    });
  }
  //fetch appointment times with respect to the selected date
  dates(d: any, e: any) {
    this.doctorId = e;
    this.admin.listTime(d.value, e).subscribe((res: any) => {
      this.apptimes = res;
      console.log(res);
    })
  }
  findPatient(patient: any) {
    console.log(patient);
    this.admin.patientHistory(patient).subscribe(res => {
      this.patientData = res;
      console.log(res);
    })
  }
  download() {
    let element: any = document.getElementById('tblPatients');
    html2canvas(element).then((canvas) => {
      console.log(canvas);
      let imgData = canvas.toDataURL('image/png')
      let doc = new jsPDF()
      let imgHeight = canvas.height * 208 / canvas.width;
      doc.addImage(imgData, 0, 0, 208, imgHeight)
      doc.save("image.pdf")
    })
  }
}

