import { Injectable } from '@angular/core';
import { Doctor, Admin, BaseDoctorDetails } from '../../models';
import { NetService } from '../net/net.service';
import { LocalStorageService } from '../local/local-storage.service';
import { LocalStorageKey } from '../../enum';
import { tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  token: string;
  doctor: Doctor;
  admin: Admin;

  constructor(private net: NetService,
    private localStorageService: LocalStorageService,
    private authService: AuthService) { }


  tokenSaver(response: any) {
    if (response.type === "doctor") {
      this.setDoctor(response.object);
      this.localStorageService.setItem(LocalStorageKey.Doctor, this.doctor._id);
    } else {
      this.setAdmin(response.object);
      this.localStorageService.setItem(LocalStorageKey.Admin, this.admin._id);
    }
  }

  private initAuthToken(token: string) {
    this.localStorageService.setItem(LocalStorageKey.Token, token);
    this.authService.setToken(token);
  }
  logout() {
    this.localStorageService.removeAll();
  }
  login(doctorDetailes: BaseDoctorDetails) {
    return this.net.login(doctorDetailes).pipe(
      tap((response: { token: string, object: Doctor }) => {
        this.setDoctor(response.object)
        this.handleLogin(response);
      })
    )
  }

  private handleLogin(response: { token: string; }) {
    this.tokenSaver(response);
    this.initAuthToken(response.token);
  }

  setToken(token: string): void {
    this.token = token;
  }

  setAdmin(admin: Admin): void {
    this.admin = admin;

  }
  setDoctor(doctor: Doctor): void {
    this.doctor = doctor;
  }
  getDoctorID(): string {
    return this.doctor._id;
  }
  getDoctor() {

    return this.net.getDoctor().pipe(
      tap((doctor: Doctor) => {
        this.setDoctor(doctor);
      })
    );
  }

  getCurrentDoctorDetails() {
    return this.localStorageService.getItem(LocalStorageKey.Doctor, false);
  }
}
