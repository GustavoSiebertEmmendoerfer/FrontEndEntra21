import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Restaurant } from 'src/models/restaurant';
import { LoginService } from 'src/services/login.service';
import { RestaurantService } from 'src/services/restaurant.service';

@Component({
  selector: 'app-restaurant-register-form',
  templateUrl: './restaurant-register-form.component.html',
  styleUrls: ['./restaurant-register-form.component.css'],
})
export class RestaurantRegisterFormComponent implements OnInit {
  constructor(
    public serviceRestaurant: RestaurantService,
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
    if (this.serviceRestaurant.confirmRestaurantPassword()) {
      this.insertRestaurant(form);
    } else {
      this.toastr.error('Your passwords do not match', 'Restaurant Register');
      this.serviceRestaurant.openRestaurantRegister();
    }
  }

  insertRestaurant(form: NgForm) {
    this.serviceRestaurant.postRestaurant().subscribe(
      (res) => {
        this.resetForm(form);
        this.serviceRestaurant.confirmPassword = '';
        this.toastr.success('Submitted succesfully', 'Restaurant Register');
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
    this.serviceRestaurant.formDataRestaurant = new Restaurant();
  }

  response = { dbPath: '' };

  uploadFinished = (event: any) => {
    console.log(event);
    this.response = event;

    this.serviceRestaurant.formDataRestaurant.photoURL = this.response.dbPath;
  };

  createImgPath = (serverPath: string) => {
    return `https://localhost:44308/${serverPath}`;
  };
}
