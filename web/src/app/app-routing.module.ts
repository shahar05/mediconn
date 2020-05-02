import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ViewPatientsComponent } from './components/view-patients/view-patients.component';
import { PatientProfileComponent } from './components/patient-profile/patient-profile.component';
import { DefaultQuestionComponent } from './components/default-question/default-question.component';


const routes: Routes = [

  {path : "" , component : LoginPageComponent},
  {path : "patients" , component: ViewPatientsComponent},
  {path : "patients/:id" , component: PatientProfileComponent},
  {path : "defaultQuestion" , component: DefaultQuestionComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
