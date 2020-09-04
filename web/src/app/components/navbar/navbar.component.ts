import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { PatientService } from 'src/app/services/patient/patient.service';
import { UserService } from 'src/app/services/user/user.service';
import { Patient, Doctor, width } from 'src/app/models';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { PatientCreateUpdateComponent } from '../patient-create-update/patient-create-update.component';
import { DoctorEditorComponent } from '../doctor-editor/doctor-editor.component';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { LocalStorageService } from 'src/app/services/local/local-storage.service';
import { LocalStorageKey } from 'src/app/enum';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  doctorID: string;
  patientOrDoctor: string;
  patient: Patient;
  doctor: Doctor;
  adminID: string;
  isAdmin: boolean = false;
  isDoctor: boolean = false;
  inLogin: boolean;
  currentUrl: string;

  systemLangs = ["English", "Arabic", "Hebrew" , "Russian"  , "French" ];
  systemLangsDictionary = { English: "flag", Arabic: "outlined_flag", Hebrew: "outlined_flag" , Russian : "outlined_flag" , French : "outlined_flag"   };

  markFlag = { en: "flag", he: "outlined_flag" }

  constructor(
    private localStorageService: LocalStorageService,
    private userService: UserService,
    private router: Router,
    private dialogService: DialogService,
    private patientService: PatientService,
    private doctorService: DoctorService,
    private translate: TranslateService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.doctorID = this.userService.getCurrentDoctorDetails();
    this.adminID = this.userService.getAdminID();

    this.router.events.subscribe(() => {

      this.doctorID = this.userService.getCurrentDoctorDetails();
      this.adminID = this.userService.getAdminID();
      this.currentUrl = this.router.url;
      this.inLogin = this.router.url === "/" || this.router.url === "/admin";
      this.isAdmin = this.router.url === "/doctors";
      this.isDoctor = !this.isAdmin;

      this.patientOrDoctor = this.isDoctor ? 'Patient' : 'Doctor';
    })

    this.userService.getDoctorByID().subscribe((doctor) => {
      this.doctor = doctor;
    }, (err) => { })
  }


  goBackToAdmin() {
    this.localStorageService.removeItem(LocalStorageKey.Doctor);

    this.router.navigate(["doctors"]);
  }
  selectLanguge(lang: string) {
    this.systemLangs.forEach((sysLang) => {

      if (lang === sysLang) {
        this.systemLangsDictionary[sysLang] = 'flag';
      } else {
        this.systemLangsDictionary[sysLang] = 'outlined_flag';
      }
    })

    this.translate.use(lang.substr(0, 2).toLocaleLowerCase());
  }
  openPatientOrDoctorEditor() {
    if (this.isDoctor) {
      this.openPatientEditor();
    } else {
      this.openDoctorEditor();
    }
  }

  isAuth() {
    return !!this.localStorageService.getItem(LocalStorageKey.Token) && this.authService.getIsAuth();
  }
  enLanguage() {
    this.markFlag.en = "flag"
    this.markFlag.he = "outlined_flag"

    this.translate.use('en');
  }
  heLanguage() {
    this.markFlag.en = "outlined_flag"
    this.markFlag.he = "flag"
    this.translate.use('he');
  }
  openDoctorEditor() {
    let doctor: Doctor = {
      password: "", languages: [], mainLanguage: null,
      creatorID: this.adminID, username: "", lastName: "",
      firstName: "", phoneNumber: "", department: ""
    };

    this.dialogService.openDialog(DoctorEditorComponent, { doctor: doctor, edit: false }, width)
      .afterClosed().subscribe((doctor: Doctor) => {

        if (doctor)
          this.doctorService.createDoctor(doctor).subscribe((createdDoctor: Doctor) => {
            console.log(createdDoctor);
            this.router.navigate(["doctors"]);

          })
      })


  }

  openPatientEditor() {
    let patient: Patient = {
      firstName: "", lastName: "", creatorID: this.doctorID, lastSeen: null,
      phoneNumber: "", language: null, questions: [], medications: [], treatments: [], endHour: 1, startHour: 0
    };

    if (!this.doctor) {
      this.userService.getDoctorByID().subscribe((doc: Doctor) => {
        this.doctor = doc;
        this.createPatient(patient);
      })
    } else {

      this.createPatient(patient);
    }


  }

  createPatient(patient) {
    this.dialogService.openDialog(PatientCreateUpdateComponent,
      { patient: patient, edit: false, languages: this.doctor.languages },
      '35%', '450px').afterClosed().subscribe((p: Patient) => {

        if (p) {

          if (this.currentUrl === '/patients')
            this.patientService.notifyAddPatient(p);
          else
            this.navToViewPatient();
        }

      })
  }

  navToViewPatient() {
    if (this.isDoctor)
      this.router.navigate(["patients"]);
    else
      this.router.navigate(["doctors"]);
  }

  navToDefaultQuestion() {
    this.router.navigate(["defaultQuestion"]);
  }

  logout() {
    this.userService.logout();
    this.router.navigate([""]);
  }

}


// <button mat-menu-item (click)="enLanguage()" >
// <mat-icon>{{ markFlag.en}}</mat-icon>
// <span>{{'English' | translate}}</span>
// </button> 
// <button mat-menu-item (click)="heLanguage()" >
// <mat-icon>{{ markFlag.he}}</mat-icon>
// <span>{{'Hebrew' | translate}}</span>
// </button> 
