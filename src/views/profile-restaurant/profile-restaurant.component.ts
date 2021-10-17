import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DeleteConfirmFormComponent } from 'src/components/delete-confirm-form/delete-confirm-form.component';
import { Plate } from 'src/models/plate';
import { LoginService } from 'src/services/login.service';
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
export class ProfileRestaurantComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'price', ' ']
  expandedPlate: Plate | null
  // imageUrl:string
  // fileToUpload:File = null
  response = { dbPath: '' }

  constructor(
    public servicePlate: PlateService,
    public serviceLogin: LoginService,
    private toastr: ToastrService,
    public dialog:MatDialog,
    public serviceRestaurant: RestaurantService,
  ) { }

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

  ngAfterViewInit(): void {
    this.servicePlate.refreshPlateList()
  }

  // handleFileInput(e:Event) {
  //   let file = (e.target as HTMLInputElement).files[0];
  //   this.fileToUpload = file
  //   var reader = new FileReader()
  //   reader.onload = (event:any) => {
  //     this.imageUrl = event.target.result
  //   }
  //   reader.readAsDataURL(this.fileToUpload)
  // }

  uploadFinished = (event:any) => {
    console.log(event)
    this.response = event 
    // debugger
    // this.serviceRestaurant.putPhotoRestaurant(this.response.dbPath).subscribe(
    //   (res) => {
    //     console.log('DEU CERTO')
    //   },
    //   (err) => {
    //     console.log(err)
    //   }
    // )
  }

  createImgPath = (serverPath: string) => {
    return `https://localhost:44308/${serverPath}`
  }
}


