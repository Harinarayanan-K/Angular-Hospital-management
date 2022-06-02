import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AdminService } from '../admin_service/admin.service';
import { HttpClient } from '@angular/common/http';
import { doctorModule } from './doctor.module';

@Component({
  selector: 'app-doctor-table',
  templateUrl: './doctor-table.component.html',
  styleUrls: ['./doctor-table.component.css']
})
export class DoctorTableComponent implements OnInit {
  constructor(private fb: FormBuilder, private adminservice: AdminService, private http: HttpClient) { }
  doctorModuleObj: doctorModule = new doctorModule();
  doctorData!: any;
  doctorId!: any;
  doctorDetails!: any;
  count!: any;
  temp: Array<any> = new Array<any>();
  ngOnInit(): void {

    this.getDoctorDetails();
  }
  doctorForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$")]],
    phoneNumber: ['', [Validators.required, Validators.pattern(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/)]],
    password: ['', [Validators.required]],
    speciality: ['', [Validators.required]],
    education: ['', [Validators.required]]
  });
  postDoctorDetails() {
    this.doctorModuleObj.name = this.doctorForm.value.name;
    this.doctorModuleObj.email = this.doctorForm.value.email;
    this.doctorModuleObj.phoneNumber = this.doctorForm.value.phoneNumber;
    this.doctorModuleObj.password = this.doctorForm.value.password
    this.doctorModuleObj.speciality = this.doctorForm.value.speciality;
    this.doctorModuleObj.education = this.doctorForm.value.education;
    this.adminservice.postDoctor(this.doctorModuleObj).subscribe(res => {
      this.getDoctorDetails();
      alert("doctor details added");
      this.doctorForm.reset();
    },
      err => {
        alert("something went  wrong")
      })
  }

  //to get doctors list

  getDoctorDetails() {
      this.adminservice.getDoctor().subscribe(res => {
      this.doctorData = res;
      console.log(res);
      this.count = this.doctorData.length;
    })
  }
  //to delete a doctor data

  deleteDoctorDetails(row: any) {
    this.adminservice.deleteDoctor(row.userId).subscribe(res => {
      console.log(res);
      alert("Doctor deleted")
      this.getDoctorDetails();
    })
  }
  //function call when edit icon clicked and it set the values to the doctorform

  editDoctorDetails(id: any) {
    console.log(id);
    this.doctorId = this.doctorData[id].userId;
    this.doctorForm.controls['name'].setValue(this.doctorData[id].name)
    this.doctorForm.controls['email'].setValue(this.doctorData[id].email)
    this.doctorForm.controls['phoneNumber'].setValue(this.doctorData[id].phoneNumber)
    this.doctorForm.controls['speciality'].setValue(this.doctorData[id].speciality)
    this.doctorForm.controls['education'].setValue(this.doctorData[id].education)
  }
  test(event: any) {
    //  this.doctorData.forEach((el:any)=>{
    //   this.temp.push(el)
    //  })
    this.doctorData = this.doctorData.filter((doc: any) => {
      const regex = new RegExp(`^${event.target.value}`, 'gi');
      return doc['name'].match(regex);
    })
    // if(event.target.value.length == 0) {
    //   this.doctorData = []
    //   this.temp.forEach((el:any)=>{
    //     this.doctorData.push(el)
    //   })
    // }
  }
  //to update doctor details and involk when update button click
  updateDoctorDetails() {
    console.log(this.doctorForm.value);
    console.log(this.doctorId);
    this.adminservice.updateDoctor(this.doctorId, this.doctorForm.value).subscribe(res => {
      alert("Doctor Details updated");
      this.doctorForm.reset();
      this.getDoctorDetails();
    })
  }
  findDoctor(doctorName: any) {
    let nameArray: any = []
    this.doctorData.forEach((element: any) => {
      if (doctorName == element['name']) {
        nameArray.push(element);
      }
    });
    this.doctorData = nameArray;
    //  this.adminservice.find(doctorName).subscribe(res=>{
    //    console.log(res);
    //    this.doctorData=res;

    //  })
  }
}
