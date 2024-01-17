import { Component, Input, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-add-edit-origins',
  templateUrl: './add-edit-origins.component.html',
  styleUrls: ['./add-edit-origins.component.scss']
})
export class AddEditOriginsComponent implements OnInit {

  constructor(private adminService: AdminService) {}

  @Input() ori: any;
  id = "";
  name = "";
  description = "";
  pictureURL = "";
  status = "";
  OriginsList: any = [];



  ngOnInit(): void {
    this.id = this.ori.id;
    this.name = this.ori.name;
    this.description = this.ori.description;
    this.pictureURL = this.ori.pictureURL;
    this.status = this.ori.status;

  }

  addOrigin() {
    var origin = {
      id: this.id,
      name: this.name,
      description: this.description,
      pictureURL: this.pictureURL,
      status: this.status
    };
    this.adminService.addOrigin(origin).subscribe(res => {
      alert(res.toString());
    });
  }

  updateOrigin() {
    var origin = {
      id: this.id,
      name: this.name,
      description: this.description,
      pictureURL: this.pictureURL,
      status: this.status
    };
    this.adminService.updateOrigin(origin).subscribe(res => {
      alert(res.toString());
    });
  }

  uploadPhoto(event: any) {
    var file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    this.adminService.uploadPhoto(formData).subscribe((data: any) => {
      this.pictureURL = data.toString();
    })
  }
 
}
