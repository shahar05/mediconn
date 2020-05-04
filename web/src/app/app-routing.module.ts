import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ViewPatientsComponent } from './components/view-patients/view-patients.component';
import { PatientProfileComponent } from './components/patient-profile/patient-profile.component';
import { DefaultQuestionComponent } from './components/default-question/default-question.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [

  {path : "" , component : LoginPageComponent } ,
  {path : "patients" , component: ViewPatientsComponent, canActivate:[AuthGuard]},
  {path : "patients/:id" , component: PatientProfileComponent, canActivate:[AuthGuard]},
  {path : "defaultQuestion" , component: DefaultQuestionComponent, canActivate:[AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
