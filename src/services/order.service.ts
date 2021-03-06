import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OrderItemFormComponent } from 'src/components/order-item-form/order-item-form.component';
import { Order } from 'src/models/order';
import { OrderResponse } from 'src/models/orderResponse';
import { Plate } from 'src/models/plate';
import { ResponseModel } from 'src/models/response';
import { userOrder } from 'src/models/UserOrder';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http:HttpClient,
    public dialogRef: MatDialog,
    public serviceLogin: LoginService,
    public router: Router
  ) { }


  readonly OrdersURL = `https://localhost:44308/api/Orders`
  readonly OrdersItemURL = `https://localhost:44308/api/OrderItem`
  selectedPlate: Plate;
  OrderClient : userOrder[] = [];
  lastOrder : OrderResponse;
  id : string = JSON.parse(localStorage.getItem("userInfo")).userId;

  openOrderItemModal(selectedPlate: Plate) {
    const dialogRef = this.dialogRef.open(OrderItemFormComponent)
    dialogRef.disableClose = true
    this.selectedPlate = selectedPlate
  }

  postOrder() {
    const body = {
      ClientEmail: this.serviceLogin.user.email,
      RestaurantEmail: this.router.url.substring(12)
    }
    return this.http.post<ResponseModel>(this.OrdersURL, body).subscribe()
  }

  LastOrder() {
    this.http
      .get<OrderResponse>(`https://localhost:44308/api/Orders/userOrder/${this.serviceLogin.user.userId}`)
      .toPromise()
      .then((res) => this.lastOrder = res as OrderResponse);
  }

  getAllOrders(){
    this.http.get<userOrder[]>(`https://localhost:44308/api/Orders/userOrders/user/${this.serviceLogin.user.userId}`)
    .toPromise()
    .then((res) => this.OrderClient= res as userOrder[]);
  }

  postOrderItem(i:number) {
    const body = {
      quantity : i,
      orderId : this.lastOrder.maiorValor,
      plateId: this.selectedPlate.plateId
    }

    return this.http.post<ResponseModel>(this.OrdersItemURL, body)
  }

  putOrder(id:number,userOrder:userOrder) {
    return this.http.put<Order>(this.OrdersURL+'/'+id,userOrder)
  }


}
