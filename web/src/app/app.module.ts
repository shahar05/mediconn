import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ViewPatientsComponent } from './components/view-patients/view-patients.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { PatientsComponent } from './components/patients/patients.component';
import { PatientComponent } from './components/patient/patient.component';
import { PatientProfileComponent } from './components/patient-profile/patient-profile.component'
import {MatTabsModule} from '@angular/material/tabs';
import {MatDividerModule} from '@angular/material/divider'
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { QuestionsComponent } from './components/questions/questions.component';
import { QuestionComponent } from './components/question/question.component';
import { MedicationsComponent } from './components/medications/medications.component';
import { MedicationComponent } from './components/medication/medication.component';
import { TreatmentsComponent } from './components/treatments/treatments.component';
import { TreatmentComponent } from './components/treatment/treatment.component';

import { DefaultQuestionComponent } from './components/default-question/default-question.component';
import { TokenInterceptor } from './interceptors/auth.interceptor';
import { DialogAlertComponent } from './components/dialog-alert/dialog-alert.component';
import { AddMedicationPopupComponent } from './components/add-medication-popup/add-medication-popup.component';
import { QuestionUpdateCreateComponent } from './components/question-update-create/question-update-create.component';
import { QuestionWrapperComponent } from './components/question-wrapper/question-wrapper.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { DoctorsViewComponent } from './components/doctors-view/doctors-view.component';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { PatientCreateUpdateComponent } from './components/patient-create-update/patient-create-update.component';
import { DoctorEditorComponent } from './components/doctor-editor/doctor-editor.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    NavbarComponent,
    ViewPatientsComponent,
    PatientsComponent,
    PatientComponent,
    PatientProfileComponent,
    QuestionsComponent,
    QuestionComponent,
    MedicationsComponent,
    MedicationComponent,
    TreatmentsComponent,
    TreatmentComponent,
    
    DefaultQuestionComponent,
    DialogAlertComponent,
    AddMedicationPopupComponent,
    QuestionUpdateCreateComponent,
    QuestionWrapperComponent,
    AdminLoginComponent,
    DoctorsViewComponent,
    DoctorsComponent,
    DoctorComponent,
    PatientCreateUpdateComponent,
    DoctorEditorComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    NoopAnimationsModule,
    HttpClientModule,
    MatTabsModule,
    MatDividerModule,
    MatListModule,
    MatExpansionModule,
    MatDialogModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
