import { Component, OnInit } from '@angular/core';
import { BaseDoctorDetails, Doctor, width, height } from 'src/app/models';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { ExpiredDialogComponent } from '../expired-dialog/expired-dialog.component';
import { LocalStorageService } from 'src/app/services/local/local-storage.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  doctor: BaseDoctorDetails = { username: "", password: "", user: "doctor" };
  msg: string;
  constructor(private router: Router, private userService: UserService, private dialogService: DialogService , private localStorage : LocalStorageService) { }

  ngOnInit(): void {
    this.localStorage.removeAll();

      // if( !sessionStorage.getItem("f")){
      //   sessionStorage.setItem("f" , "f");
      //   window.location.reload();
      // }
      

    if (this.router.url === "/expired") {
      this.dialogService.openDialog(ExpiredDialogComponent,
        { title: "Expired", body: "User Authentication has expired", cancel: false, closeButtonText: "Submit" },
        width, height
      )
    }

  }
  isEmpty( text : string){

    return !text.trim().length

  }
  login() {
    if (!this.doctor.username.length || !this.doctor.password.length) {
      //this.msg = "Password and username cannot be empty";
      return;
    }
    this.doctorLogin();
  }

  doctorLogin() {

    sessionStorage.clear()
    this.userService.login(this.doctor).subscribe((response: any) => {
     
      this.router.navigate(["patients"]);
      

    }, (error) => {
      console.log(error);
      this.msg = "Password or username is incorrect";
    })
  }


}
