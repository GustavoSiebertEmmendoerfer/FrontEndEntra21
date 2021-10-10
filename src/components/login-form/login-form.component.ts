import { Component, OnInit } from '@angular/core';
import { ResponseModel } from 'src/models/response';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(public serviceLogin:LoginService) { }

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
      }
    )
  }
}
