import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin_service/admin.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private rt: Router, public service: AdminService) { }

  ngOnInit(): void {
  }
  logout() {
    localStorage.removeItem("accesstoken");
    this.rt.navigateByUrl('login');
  }
}


