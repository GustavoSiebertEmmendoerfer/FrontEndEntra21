import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { userOrder } from 'src/models/UserOrder';
import { LoginService } from 'src/services/login.service';
import { OrderService } from 'src/services/order.service';

@Component({
  selector: 'app-orders-by-client',
  templateUrl: './orders-by-client.component.html',
  styleUrls: ['./orders-by-client.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class OrdersByClientComponent implements OnInit {
  displayedColumns: string[] = ['status', 'restaurantName', 'plateName','price']
  expandedOrder: userOrder | null

  constructor(
    public serviceOrder:OrderService,
    public toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.Orders()
  }

  Orders() {
    this.serviceOrder.getAllOrders()
    console.log(this.serviceOrder.OrderClient) 
  }

  onCancel(id:number, order:userOrder, status:string) {
    this.expandedOrder = null
    order.status = status
    this.serviceOrder.putOrder(id,order).subscribe(
      (res) => {
        this.toastr.success('Changed status succesfully', 'Order Status');
      },
      (err) => {
        console.log(err)
      }
    )
  }
}
