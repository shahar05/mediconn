import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/services/patient/patient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient, MedicalAdditions, Question, width, height, Doctor, QuestionText } from 'src/app/models';
import { MatDialog } from '@angular/material/dialog';
import { DialogAlertComponent } from '../dialog-alert/dialog-alert.component';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { AddMedicationPopupComponent } from '../add-medication-popup/add-medication-popup.component';
import { AddPopupType, Language } from 'src/app/enum';
import { UserService } from 'src/app/services/user/user.service';
import { QuestionWrapperComponent } from '../question-wrapper/question-wrapper.component';
import { QuestionService } from 'src/app/services/question/question.service';
import { PatientCreateUpdateComponent } from '../patient-create-update/patient-create-update.component';
import { DatePickerDialogComponent } from '../date-picker-dialog/date-picker-dialog.component';
import { GraphPatientComponent } from '../graph-patient/graph-patient.component';
import { SmsDialogComponent } from '../sms-dialog/sms-dialog.component';


@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss']
})
export class PatientProfileComponent implements OnInit {
  patientID: string;
  patient: Patient;
  creatorID: string;
  doctor: Doctor;
  constructor(
    private router: Router,
    private questionService: QuestionService,
    private patientService: PatientService,
    private dialogService: DialogService,
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.patientID = this.route.snapshot.paramMap.get('id');
    this.initPatient();
    this.creatorID = this.userService.getDoctorID();
    this.userService.getDoctor().subscribe((doctor: Doctor) => { this.doctor = doctor; })

  }
  initPatient() {
    this.patientService.getPatientByID(this.patientID).subscribe((patient: Patient) => {
      this.patient = patient;
    });
  }


  openSMSDialog(){
    this.dialogService.openDialog(SmsDialogComponent ,{ doctor : this.doctor , patient : this.patient    },width , height ).afterClosed()
    .subscribe((link)=>{
      if(link){
          link = "Message from Dr." + this.doctor.lastName +"  " + this.doctor.firstName +": " +link;
          this.patientService.sendSms(link , this.patient.phoneNumber).subscribe(()=>{
          }, (err)=>{
            
          })
      }
    })
  }

  showGraphs() {


    this.dialogService.openDialog(DatePickerDialogComponent, {}).afterClosed().subscribe((dates: { dateStart: Date, dateEnd: Date }) => {

      if (dates) {

        let d1 = dates.dateStart;
        let d2 = dates.dateEnd;
        let str1 = d1.getFullYear() + "-" + (d1.getMonth() + 1) + "-" + d1.getDate();
        let str2 = d2.getFullYear() + "-" + (d2.getMonth() + 1) + "-" + d2.getDate();
        this.patientService.getQuestionResults(this.patientID, str1, str2).subscribe((arr: any) => {
          this.dialogService.openDialog(GraphPatientComponent, { arr: arr, headline: this.patient.firstName + "   " + this.patient.lastName }, "80%").afterOpened().subscribe(() => {
          })
        })
      }
    })



  }
  editPaient() {

    let patient: Patient = JSON.parse(JSON.stringify(this.patient));

    this.dialogService.openDialog(PatientCreateUpdateComponent,
      { patient: patient, edit: true, languages: this.doctor.languages },

      '35%', '400px').afterClosed().subscribe((patient: Patient) => {
      })
  }
  deletePaient() {

    this.dialogService.openDialog(DialogAlertComponent, { isDefault: false }, width, height)
      .afterClosed().subscribe((res) => {
        if (res) {
          this.patientService.deletePatient(this.patientID).subscribe(() => {
            this.router.navigate(["/patients"]);
          }, (err) => {
            console.log(err);
          })
        }
      })


  }

  deleteQuestion(questionToBeDeleted: Question) {
    this.dialogService.openDialog(DialogAlertComponent, { isDefault: false }, width, height)
      .afterClosed().subscribe((toDelete) => {
        if (toDelete)
          this.patientService.deleteQuestionFromPatient(questionToBeDeleted._id, this.patient._id)
            .subscribe(() => {
              let i: number = this.patient.questions.findIndex((quest) => quest._id == questionToBeDeleted._id);
              this.patient.questions.splice(i, 1);
            }, (err) => {
              alert(err);
              console.log(err);
            })
      })
  }

  addNewQuestions() {
    // Need: CreatorID Languages isDefault questionNeedToUpdate


    let question: Question =
    {
      textArr: [{ text: "", language: this.patient.language }]
      , creatorID: this.creatorID
      , isDefault: false, questionType: null
    };
    this.dialogService
      .openDialog(QuestionWrapperComponent,
        { question: question, questionNeedToUpdate: false }, width)
      .afterClosed().subscribe((newQuestion: Question) => {
        if (newQuestion)
          this.patientService.createNewQuestionToPatient(newQuestion, this.patientID)
            .subscribe((questionResponse: Question) => {
              this.patient.questions.push(questionResponse);
            })
      }, (err) => console.log(err));

  }

  editQuestion(questionToEdit: Question) {

    let questionRefernce: Question = questionToEdit;

    this.dialogService
      .openDialog(QuestionWrapperComponent,
        { question: questionRefernce, questionNeedToUpdate: true }, width)
      .afterClosed().subscribe((newQuestion: Question) => {
        if (newQuestion)
          this.questionService.updateQuestion(newQuestion).subscribe((q: Question) => { },
            (err) => {
              console.log(err);
            })
      })
  }


  editMedication(med: MedicalAdditions) {
    let medical: MedicalAdditions = JSON.parse(JSON.stringify(med));
    this.dialogService.openDialog(AddMedicationPopupComponent, { type: med.additionType, medicalAddition: medical }, "33%", "250px")
      .afterClosed().subscribe((medical: MedicalAdditions) => {
        if (medical)
          this.patientService.editMedicalAdditions(medical).subscribe((updatedMedical: MedicalAdditions) => {
            this.changeMedical(updatedMedical, this.patient);
          })
        else {
          console.log("null");
        }
      })
  }
  changeMedical(updatedMedical: MedicalAdditions, patient: Patient) {

    let arr: any[];
    arr = updatedMedical.additionType == AddPopupType.Medication ?
      patient.medications : patient.treatments;

    let index = arr.findIndex((e) => e._id === updatedMedical._id);
    if (index != -1) {
      arr[index] = updatedMedical;
    } else {
      console.log("Not found");
    }
  }

  deleteMedication(med: MedicalAdditions) {

    this.dialogService.openDialog(DialogAlertComponent, { isDefault: false }, width, height)
      .afterClosed().subscribe((res) => {
        if (res) {
          this.patientService.deleteMedicalAdditions(med._id).subscribe(() => {
            // Render view
          }, (err) => {
            console.log(err);
          })
        }
      })
  }
  addNewMedications() {
    this.openAddMedicationPopupComponent(AddMedicationPopupComponent, AddPopupType.Medication);
  }
  addNewTreatments() {
    this.openAddMedicationPopupComponent(AddMedicationPopupComponent, AddPopupType.Treatments);
  }

  private openAddMedicationPopupComponent(component, type: AddPopupType) {

    this.dialogService.openDialog(component, { type: type, medicalAddition: null }, "33%", "250px")
      .afterClosed().subscribe((medicalAddition: MedicalAdditions) => {
        if (!medicalAddition) {
          return;
        }
        medicalAddition.patientId = this.patientID;
        medicalAddition.creatorId = this.userService.getCurrentDoctorDetails();

        this.patientService.createMedicalAdditions(medicalAddition).subscribe(() => {
          this.initPatient();
        });
      });
  }

}


        // let i: number = this.patient.questions.findIndex((quest) => quest._id === questionToEdit._id);
        // this.patient.questions[i] = newQuestion;