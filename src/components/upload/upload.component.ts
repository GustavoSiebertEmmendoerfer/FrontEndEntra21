import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  public message:string
  public progress:number
  @Output() public onUploadFinished = new EventEmitter();

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
  }

  public uploadFile = (files) => {
    if (files.lenght === 0)
      return 

    let fileToUpload = <File>files[0]
    const formData = new FormData()
    formData.append('file', fileToUpload, fileToUpload.name)

    this.http.post('https://localhost:44308/api/Image/api/UploadImage', formData, { reportProgress: true, observe: 'events'})
    .subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total)
      }
      else if (event.type === HttpEventType.Response) {
        this.message = 'Upload sucess.'
        this.onUploadFinished.emit(event.body);
      }
    })
  }
}
