import { Component, OnInit } from '@angular/core';
import {  BaseDoctorDetails } from 'src/app/models';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  doctor : BaseDoctorDetails = {username :"" , password:""};
  msg : string;
  constructor(private router : Router , private loginService : LoginService) { }

  ngOnInit(): void {
  }

  login(){
  
    
    if(this.doctor.password.toString().length === 0 || this.doctor.username.toString().length === 0 ){
      this.msg = "password or username is empty"
    }else{
      this.loginService.login(this.doctor).subscribe((user)=>{
        if(user){
          this.router.navigate(["patients"]);
        }else{
          console.log("from login-page dosent login ");
          console.log(user);
        }
    })
    }
  

    

  }

}
