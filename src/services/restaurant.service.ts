import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RestaurantRegisterFormComponent } from 'src/components/restaurant-register-form/restaurant-register-form.component';
import { Restaurant } from 'src/models/restaurant';
import { ResponseModel } from 'src/models/response';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(
    public dialog:MatDialog,
    private http:HttpClient
  ) { }


  readonly RestaurantURL = `https://localhost:44308/api/User/`;

  formDataRestaurant:Restaurant = new Restaurant();
  RestaurantList: Restaurant[] = [];  
  confirmPassword:string = '';
  restaurant:Restaurant

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

  putRestaurant(body) {
    return this.http.put(this.RestaurantURL, body)
  }

  postRestaurant() {
    return this.http.post(this.RestaurantURL+'RegisterRestaurant', this.formDataRestaurant);
  }

  putPhotoRestaurant(photoURL:string) {
    let user = JSON.parse(localStorage.getItem('userInfo'))
    return this.http.put(this.RestaurantURL+user.email, photoURL);
  }

  deleteRestaurant(id: number) {
    return this.http.delete(`${this.RestaurantURL}/${id}`);
  }

  getRestaurant(email:string) {
    this.http
      .get<ResponseModel>(this.RestaurantURL+'Restaurant'+'/'+email)
      .toPromise()
      .then((res) => this.restaurant = res.dateSet as Restaurant)
  }

  refreshRestaurantList() {
    this.http
      .get<ResponseModel>(this.RestaurantURL+'GetAllRestaurants')
      .toPromise()
      .then((res) => this.RestaurantList = res.dateSet as Restaurant[]);
  }
}
