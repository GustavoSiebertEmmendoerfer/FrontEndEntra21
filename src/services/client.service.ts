import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClientRegisterFormComponent } from 'src/components/client-register-form/client-register-form.component';
import { Client } from 'src/models/client';
import { ResponseModel } from 'src/models/response';
import { MenuComponent } from 'src/views/menu/menu.component';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    public dialog:MatDialog,
    private http:HttpClient
  ) { }

  readonly ClientURL = `https://localhost:44308/api/Register/`;
  formDataClient:Client = new Client();
  clientList: Client[] = [];  
  confirmPassword:string = '';

  openClientRegister() {
    const dialogRef = this.dialog.open(ClientRegisterFormComponent);
    dialogRef.disableClose = true
  }

  confirmClientPassword() {
    if (this.formDataClient.password == this.confirmPassword) {
      return true;
    }
    return false;
  }

  postClient() {
    return this.http.post("https://localhost:44308/api/Register/RegisterClient", this.formDataClient);
  }

  deleteClient(id: number) {
    return this.http.delete(`${this.ClientURL}/${id}`); 
  }

  refreshClientList() {
    this.http
      .get<Client[]>(this.ClientURL)
      .toPromise()
      .then((res) => (this.clientList = res as Client[]));
  }
}
