import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurant } from 'src/models/restaurant';
import { RestaurantService } from 'src/services/restaurant.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  response = { dbPath: '' }
  constructor(public service:RestaurantService, public router:Router) { }

  ngOnInit(): void {
  
   this.PegarInfo()
  }
  PegarInfo()
  {
    this.service.refreshRestaurantList()
    console.log(this.service.RestaurantList)
  }
 
  RedirecionarRestaurante(restaurant:Restaurant)
  {
    this.router.navigate(["/restaurant",restaurant.email])
  }
  uploadFinished = (event:any) => {
    console.log(event)
    this.response = event 
  }

  createImgPath = (serverPath: string) => {
    return `https://localhost:44308/${serverPath}`
  }
}
