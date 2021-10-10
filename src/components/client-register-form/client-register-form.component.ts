import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Client } from 'src/models/client';
import { ClientService } from 'src/services/client.service';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-client-register-form',
  templateUrl: './client-register-form.component.html',
  styleUrls: ['./client-register-form.component.css'],
})
export class ClientRegisterFormComponent implements OnInit {
  constructor(
    public serviceClient: ClientService,
    public serviceLogin: LoginService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  getErrorMessage(input: NgModel) {
    if (input.hasError('required')) {
      return 'You must enter a value!';
    }
    if (input.invalid) {
      return 'Please enter a valid value!';
    }
    return '';
  }

  onSubmit(form: NgForm) {
    if (this.serviceClient.confirmClientPassword()) {
      this.insertClient(form);
    } else {
      this.toastr.error('Your passwords do not match', 'Client Register');
      this.serviceClient.openClientRegister();
    } 
  }
  
  insertClient(form: NgForm) {
    this.serviceClient.postClient().subscribe(
      (res) => {
        this.resetForm(form);
        this.serviceClient.confirmPassword = '';
        this.toastr.success('Submitted succesfully', 'Client Register');
        this.serviceLogin.openLogin();
      },
      (err) => {
        console.log(err);
        this.resetForm(form);
      }
    );
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.serviceClient.formDataClient = new Client();
  }
}
