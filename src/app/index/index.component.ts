import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin_service/admin.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private adminservice: AdminService) { }
  doctorData!: any;
  deptData!: any;

  ngOnInit(): void {
    this.getSpeciality();
  }

  getSpeciality() {
    this.adminservice.listDepartment().subscribe(res => {
      console.log(res);
      this.deptData = res;
    })
  }
  listDoctors(e: any) {
    this.adminservice.listDoctor(e).subscribe((res: any) => {
      console.log(res)
      this.doctorData = res;
      console.log(this.doctorData);
    })
  }
  getDoctorDetails() {
  }
}
