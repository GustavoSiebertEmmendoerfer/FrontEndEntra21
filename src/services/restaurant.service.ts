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

  readonly RestaurantURL = `https://localhost:44308/api/Register/`;
  readonly RestaurantPhotoURL = `https://localhost:44308/api/User/`;
  formDataRestaurant:Restaurant = new Restaurant();
  RestaurantList: Restaurant[] = [];  
  confirmPassword:string = '';

  openRestaurantRegister() {
    const dialogRef = this.dialog.open(RestaurantRegisterFormComponent);
    dialogRef.disableClose = true
  }

  confirmRestaurantPassword() {
    if (this.formDataRestaurant.password == this.confirmPassword) {
      return true;
    }
    return false;
  }

  postRestaurant() {
    return this.http.post(this.RestaurantURL+'RegisterRestaurant', this.formDataRestaurant);
  }

  putPhotoRestaurant(photoURL:string) {
    let user = JSON.parse(localStorage.getItem('userInfo'))
    return this.http.put(this.RestaurantPhotoURL+user.email, photoURL);
  }

  deleteRestaurant(id: number) {
    return this.http.delete(`${this.RestaurantURL}/${id}`);
  }

  refreshRestaurantList() {
    this.http
      .get<Restaurant[]>(this.RestaurantURL+'/'+JSON.parse(localStorage.getItem('userInfo')).email)
      .toPromise()
      .then((res) => (this.RestaurantList = res as Restaurant[]));
  }
}
