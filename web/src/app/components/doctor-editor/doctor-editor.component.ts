import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Doctor } from 'src/app/models';
import { Language } from 'src/app/enum';

@Component({
  selector: 'app-doctor-editor',
  templateUrl: './doctor-editor.component.html',
  styleUrls: ['./doctor-editor.component.scss']
})
export class DoctorEditorComponent implements OnInit {
  doctor: Doctor;
  headline: string;
  message: string;
  checks = { Hebrew: false, Russian: false, Arabic: false, French: false, English: false }
  password: string = "";
  languages: Language[] = [Language.Hebrew, Language.Russian, Language.French, Language.English, Language.Arabic];
  constructor(
    public dialogRef: MatDialogRef<DoctorEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { doctor: Doctor, edit: boolean }
  ) { }

  ngOnInit(): void {
    this.headline = this.data.edit ? "Update" : "Create";
    this.doctor = this.data.doctor;
  }

  cancel() {
    this.dialogRef.close(null);
  }


  submit() {
    if (!this.isGoodDoctor(this.doctor)) {
      alert(this.message);
      return;
    }
    this.dialogRef.close(this.doctor);
  }



  isGoodDoctor(doctor: Doctor): boolean {


    if (!this.stringConatinsOnlyLetters(doctor.firstName)) {
      this.message = " first name must contains only lettrs";
      return false;
    }
    if (!this.stringConatinsOnlyLetters(doctor.lastName)) {
      this.message = " last name must contains only lettrs";
      return false;
    }
    if (!this.correctPhoneNumber(doctor.phoneNumber)) {
      this.message = "Phone number should contain 10 digits";
      return false;
    }
    if(!this.data.edit){
      if (!this.selectedLangugesContainMainLangauge(this.checks, doctor.mainLanguage)) {
        this.message = "Main Language does not apear in list of all known languages";
        return false;
      }
      this.insertSelectLanguagesToDoctor(this.doctor.languages, this.checks);
    }
   
    this.doctor.lastName = this.turnFirstLetterToUpperCase(doctor.lastName);
    this.doctor.firstName = this.turnFirstLetterToUpperCase(doctor.firstName);
    return true;

  }
  turnFirstLetterToUpperCase(str: string) {
  return  str.charAt(0).toUpperCase() + str.slice(1);
  }


  stringConatinsOnlyLetters(str: string) {
    return /^[a-zA-Z]+$/.test(str);
  }

  correctPhoneNumber(phone: string) {
    return /[0-9]{3}-?[0-9]{7}$/.test(phone)
  }
  selectedLangugesContainMainLangauge(checks: any, mainLanguage: Language): boolean {
    return checks[mainLanguage];
  }

  insertSelectLanguagesToDoctor(languages: Language[], dictionaryLanguage: any) {
    this.languages.forEach((lang) => {
      if (dictionaryLanguage[lang]) {
        languages.push(lang);
      }
    })
  }
}




    // if(!d.creatorID.length || !d.department.trim().length 
    //  || !d.firstName.trim().length || !d.lastName.trim().length
    //  || !d.password.trim().length || !d.username.trim().length || !d.mainLanguage.trim() ){
    //   this.message = "Please Fill all fields";
    //   return false;
    //  } 