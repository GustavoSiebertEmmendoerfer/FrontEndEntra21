import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/services/login.service';
import { OrderService } from 'src/services/order.service';

@Component({
  selector: 'app-orders-by-client',
  templateUrl: './orders-by-client.component.html',
  styleUrls: ['./orders-by-client.component.css']
})
export class OrdersByClientComponent implements OnInit {

  constructor(public serviceOrder:OrderService) { }

  ngOnInit(): void {
    this.Orders()
  }

  Orders()
  {
    this.serviceOrder.ListOrder()
    this.serviceOrder.OrderList
  }

}
