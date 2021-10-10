import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginFormComponent } from 'src/components/login-form/login-form.component';
import { Login } from 'src/models/login';
import { ResponseModel } from 'src/models/response';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(public dialog: MatDialog, private http:HttpClient) {}

  readonly LoginURL = `https://localhost:44308/api/User/Login`

  formDataLogin: Login = new Login();

  openLogin() {
    const dialogRef = this.dialog.open(LoginFormComponent);
    this.formDataLogin = new Login();
  }

  confirmLogin() {

    const body = {
      Email: this.formDataLogin.email,
      Password: this.formDataLogin.password
    }

    return this.http.post<ResponseModel>(`${this.LoginURL}`, body);
  }
}
