import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DeleteConfirmFormComponent } from 'src/components/delete-confirm-form/delete-confirm-form.component';
import { Plate } from 'src/models/plate';
import { Restaurant } from 'src/models/restaurant';
import { LoginService } from 'src/services/login.service';
import { OrderService } from 'src/services/order.service';
import { PlateService } from 'src/services/plate.service';
import { RestaurantService } from 'src/services/restaurant.service';


@Component({
  selector: 'app-profile-restaurant',
  templateUrl: './profile-restaurant.component.html',
  styleUrls: ['./profile-restaurant.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ProfileRestaurantComponent implements OnInit {
  
  constructor(
    public servicePlate: PlateService,
    public serviceLogin: LoginService,
    private toastr: ToastrService,
    public dialog:MatDialog,
    public serviceRestaurant: RestaurantService,
    public serviceOrder: OrderService,
    private router: Router
    ) { }

  displayedColumns: string[] = ['name', 'price', ' ']
  expandedPlate: Plate | null
  response = { dbPath: '' }

  onDelete(id:number) {
    const dialogRef = this.dialog.open(DeleteConfirmFormComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.servicePlate.deletePlate(id).subscribe(
          (res) => {
            this.servicePlate.refreshPlateList();
            this.toastr.error('Deleted plate succesfully', 'Plate Register');
          },
          (err) => {
            console.log(err);
          }
        );
      }
    })
  }
  
  ngOnInit(): void {
    this.servicePlate.refreshPlateList()
    this.serviceRestaurant.getRestaurant(this.router.url.substring(12))    
  }

  createImgPath = (serverPath: string) => {
    return `https://localhost:44308/${serverPath}`;
  };
}


