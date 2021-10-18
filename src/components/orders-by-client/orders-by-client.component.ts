import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-orders-by-client',
  templateUrl: './orders-by-client.component.html',
  styleUrls: ['./orders-by-client.component.css']
})
export class OrdersByClientComponent implements OnInit {

  constructor(public serviceLogin:LoginService) { }

  ngOnInit(): void {
  }

}
