import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ViewPatientsComponent } from './components/view-patients/view-patients.component';
import { PatientProfileComponent } from './components/patient-profile/patient-profile.component';
import { DefaultQuestionComponent } from './components/default-question/default-question.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { DoctorsViewComponent } from './components/doctors-view/doctors-view.component';
import { AuthAdminGuard } from './guards/auth-admin.guard';
import { GraphPatientComponent } from './components/graph-patient/graph-patient.component';


const routes: Routes = [

  {path : "" , component : LoginPageComponent } ,
  {path : "expired" , component : LoginPageComponent } ,
  {path : "admin" , component: AdminLoginComponent , },
  {path: "doctors" , component : DoctorsViewComponent , canActivate:[AuthAdminGuard] },
  {path : "patients" , component: ViewPatientsComponent, canActivate:[AuthGuard]},
  {path : "patients/:id" , component: PatientProfileComponent, canActivate:[AuthGuard]},
  {path : "defaultQuestion" , component: DefaultQuestionComponent, canActivate:[AuthGuard]},
  {path: "graphs/:id/:startime/:endtime" , component : GraphPatientComponent , canActivate:[AuthGuard] }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
