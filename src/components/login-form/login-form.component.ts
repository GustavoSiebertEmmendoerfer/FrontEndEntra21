import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResponseModel } from 'src/models/response';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(
    public serviceLogin:LoginService, 
    private toastr:ToastrService, 
    private router:Router,
    private http:HttpClient  
  ) { }

  ngOnInit(): void {
  }

  getErrorMessage(input:any) {
    if (input.hasError('required')) {
      return 'You must enter a value';
    }
    return ''
  }

  login() {
    this.serviceLogin.confirmLogin().subscribe((data:ResponseModel) => {
        localStorage.setItem('userInfo', JSON.stringify(data.dateSet))
        this.serviceLogin.user = JSON.parse(localStorage.getItem('userInfo'))
        if (this.serviceLogin.isUserLogged()) {
          this.toastr.success('Logged Successfully', 'Login')
          this.router.navigate(["/menu"])
          const body = {
            Email: JSON.parse(localStorage.getItem('userInfo')).email
          }
          this.http.post(`https://localhost:44308/api/User/`, body).subscribe()
        } else {
          this.toastr.error(data.responseMessage, 'Error on Login')
        }
      }
    )
  }
}
