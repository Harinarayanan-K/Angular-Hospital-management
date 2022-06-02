import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private rt: Router, private http: HttpClient) { }

  ngOnInit(): void {
  }
  loginForm = this.fb.group(
    {
      email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$")]],
      password: ['', [Validators.required]]
    }
  )
  //function involk when login button click
  login() {
    if (this.loginForm.valid) {
      this.http.post<any>("http://localhost:8080/login", this.loginForm.value).subscribe(res => {
        const name = res.name;
        const email = res.email;
        const type = res.type;
        const id = res.id;
        const accesstoken = res.accessToken.value;
        console.log(accesstoken);
        localStorage.setItem("accesstoken", accesstoken);
        localStorage.setItem("doctorId", id);
        console.log(name);
        console.log(email);
        console.log(type);
        // check type=admin or doctor 
        if (type == 'admin') {
          this.rt.navigate(["doctor-table"])
        }
        else if (type == 'doctor') {
          this.rt.navigate(["doctor-view"])
        }
      }, err => { alert("Invalid Login") })
    }
  }
}
