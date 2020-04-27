import { Component, OnInit } from '@angular/core';
import {  BaseDoctorDetails, Doctor } from 'src/app/models';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  doctor : BaseDoctorDetails = {username :"" , password:"",user:"doctor"};
  msg : string;
  constructor(private router : Router , private userService : UserService ) { }

  ngOnInit(): void {
  }

  login(){
     this.userService.login( this.doctor).subscribe((response : any)=>{
      this.userService.tokenSaver(response);
      this.router.navigate(["patients"]);

}   ,(error)=>{
console.log("in the error");
console.log(error);

} )
  }

}
