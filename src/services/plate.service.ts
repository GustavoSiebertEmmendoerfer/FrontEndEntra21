import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// import { PlateRegisterFormComponent } from 'src/components/Plate-register-form/Plate-register-form.component';
import { Plate } from 'src/models/plate';
import { ResponseModel } from 'src/models/response';
import { MenuComponent } from 'src/views/menu/menu.component';

@Injectable({
  providedIn: 'root'
})
export class PlateService {

  constructor(
    public dialog:MatDialog,
    private http:HttpClient
  ) { }

  readonly PlateURL = `https://localhost:44308/api/Plates/`;
  formDataPlate:Plate = new Plate();
  PlateList: Plate[] = [];  

  openPlateRegister() {
    // const dialogRef = this.dialog.open(PlateRegisterFormComponent);
    // dialogRef.disableClose = true
  }

  postPlate() {
    return this.http.post(this.PlateURL, this.formDataPlate);
  }

  deletePlate(id: number) {
    return this.http.delete(`${this.PlateURL}/${id}`); 
  }

  refreshPlateList() {
    this.http
      .get<Plate[]>(this.PlateURL)
      .toPromise()
      .then((res) => {
          this.PlateList = res as Plate[]
      });
  }
}
