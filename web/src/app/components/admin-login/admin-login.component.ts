import { Component, OnInit } from '@angular/core';
import { BaseDoctorDetails } from 'src/app/models';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  admin: BaseDoctorDetails = { username: "", password: "", user: "admin" };
  msg: string;
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {

// sessionStorage.clear();

  }

  login() {
    if (!this.admin.username.length || !this.admin.password.length) {
      this.msg = "Password and username cannot be empty";
      return;
    }
    this.adminLogin();

  }
  adminLogin() {
    
    this.userService.adminLogin(this.admin).subscribe((res) => {
      console.log(res);
      this.router.navigate(["doctors"]);
    }, (err) => console.log(err))
  }

}
