import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Restaurant } from 'src/models/restaurant';
import { RestaurantService } from 'src/services/restaurant.service';

@Component({
  selector: 'app-restaurant-register-form',
  templateUrl: './restaurant-register-form.component.html',
  styleUrls: ['./restaurant-register-form.component.css']
})
export class RestaurantRegisterFormComponent implements OnInit {

  constructor(public serviceRestaurant:RestaurantService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  getErrorMessage(input:any) {
    if (input.hasError('required')) {
      return 'You must enter a value';
    }
    return ''
  }

  onSubmit(form: NgForm) {
    if (this.serviceRestaurant.confirmRestaurantPassword()) {
      if (this.serviceRestaurant.formDataRestaurant.userId == 0) {
        this.insertRestaurant(form);
      } else {
        this.updateRestaurant(form);
      }
    } else {
      this.toastr.error('Your passwords do not match', 'Restaurant Register');
    }
  }

  insertRestaurant(form: NgForm) {
    this.serviceRestaurant.postRestaurant().subscribe(
      (res) => {
        this.resetForm(form);
        this.serviceRestaurant.refreshRestaurantList();
        this.toastr.success('Submitted succesfully', 'Restaurant Register');
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updateRestaurant(form: NgForm) {
    this.serviceRestaurant.putRestaurant().subscribe(
      (res) => {
        this.resetForm(form);
        this.serviceRestaurant.refreshRestaurantList();
        this.toastr.info('Updated succesfully', 'Restaurant Register');
      },
      (err) => {
        console.log(err);
      }
    );
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.serviceRestaurant.formDataRestaurant = new Restaurant();
  }
}
