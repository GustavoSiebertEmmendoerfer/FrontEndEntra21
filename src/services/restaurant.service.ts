import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RestaurantRegisterFormComponent } from 'src/components/restaurant-register-form/restaurant-register-form.component';
import { Restaurant } from 'src/models/restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(
    public dialog:MatDialog,
    private http:HttpClient
  ) { }

  readonly RestaurantURL = `https://localhost:44335/api/Restaurant`;
  formDataRestaurant:Restaurant = new Restaurant();
  RestaurantList: Restaurant[] = [];  
  confirmPassword:string = '';

  openRestaurantRegister() {
    const dialogRef = this.dialog.open(RestaurantRegisterFormComponent);
  }

  confirmRestaurantPassword() {
    if (this.formDataRestaurant.password == this.confirmPassword) {
      return true;
    }
    return false;
  }

  postRestaurant() {
    return this.http.post(this.RestaurantURL, this.formDataRestaurant);
  }

  putRestaurant() {
    return this.http.put(
      `${this.RestaurantURL}/${this.formDataRestaurant.userId}`,
      this.formDataRestaurant
    );
  }

  deleteRestaurant(id: number) {
    return this.http.delete(`${this.RestaurantURL}/${id}`);
  }

  refreshRestaurantList() {
    this.http
      .get<Restaurant[]>(this.RestaurantURL)
      .toPromise()
      .then((res) => (this.RestaurantList = res as Restaurant[]));
  }
}
