import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginFormComponent } from 'src/components/login-form/login-form.component';
import { Login } from 'src/models/login';
import { ResponseModel } from 'src/models/response';
import { User } from 'src/models/user';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    public dialog:MatDialog,
    private http:HttpClient,
    private router:Router,
    private toastr:ToastrService
  ) {}

  readonly LoginURL = `https://localhost:44308/api/User/Login`;

  formDataLogin: Login = new Login();

  openLogin() {
    const dialogRef = this.dialog.open(LoginFormComponent);
    this.formDataLogin = new Login();
  }

  user = JSON.parse(localStorage.getItem('userInfo'));

  isUserLogged() {
    if (
      JSON.parse(localStorage.getItem('userInfo')) == null ||
      localStorage.length == 0
    ) {
      return false;
    }
    return true;
  }

  isUserRestaurant() {
    if (this.isUserLogged()) {
      if (JSON.parse(localStorage.getItem('userInfo')).roles[0] = 'Restaurant') {
        return true
      }
    }
    return false
  }

  onLogout() {
    localStorage.removeItem('userInfo');
    this.router.navigate(['/menu']);
    this.toastr.info('Logged out Succesfully', 'Loggout')
  }

  confirmLogin() {
    const body = {
      Email: this.formDataLogin.email,
      Password: this.formDataLogin.password,
    };
    return this.http.post<ResponseModel>(`${this.LoginURL}`, body);
  }
}
