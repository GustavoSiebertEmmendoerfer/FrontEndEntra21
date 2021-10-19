import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Plate } from 'src/models/plate';
import { PlateService } from 'src/services/plate.service';

@Component({
  selector: 'app-add-plate-form',
  templateUrl: './add-plate-form.component.html',
  styleUrls: ['./add-plate-form.component.css']
})
export class AddPlateFormComponent implements OnInit {

  constructor(
    public servicePlate: PlateService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {

  }

  getErrorMessage(input: NgModel) {
    if (input.hasError('required')) {
      return 'You must enter a value!';
    }
    if (input.invalid) {
      return 'Please enter a valid value!';
    }
    return '';
  }

  onSubmit(form: NgForm) {
    this.servicePlate.postPlate().subscribe(
      (res) => {
        this.resetForm(form);
        this.toastr.success('Submitted succesfully', 'Plate Register');
        this.servicePlate.refreshPlateList()
      },
      (err) => {
        console.log(err);
        this.resetForm(form);
      }
    );
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.servicePlate.formDataPlate = new Plate();
  }

  response = { dbPath: '' };

  uploadFinished = (event: any) => {
    console.log(event);
    this.response = event;

    this.servicePlate.formDataPlate.photoURL = this.response.dbPath;
  };

  createImgPath = (serverPath: string) => {
    return `https://localhost:44308/${serverPath}`;
  };
}
