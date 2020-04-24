import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ViewPatientsComponent } from './components/view-patients/view-patients.component';


const routes: Routes = [

  {path : "" , component : LoginPageComponent},
  {path : "patients" , component: ViewPatientsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
