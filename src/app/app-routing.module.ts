import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './login/admin-login.component';
import { DoctorTableComponent } from './admin-view/doctor-table.component';
import { DoctorViewComponent } from './doctor-view/doctor-view.component';
import { PatientViewComponent } from './patient-view/patient-view.component';
import { IndexComponent } from './index/index.component';


const routes: Routes = [
  {path:'',component:IndexComponent},
  {path:'login',component:AdminLoginComponent},
  {path:'doctor-table',component:DoctorTableComponent},
  {path:'doctor-view',component:DoctorViewComponent},
  {path:'patient-view',component:PatientViewComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
