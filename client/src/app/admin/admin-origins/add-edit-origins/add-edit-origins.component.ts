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
  status = true;
  file: File | null = null;


  ngOnInit(): void {
    this.id = this.ori.id;
    this.name = this.ori.name;
    this.description = this.ori.description;
    this.pictureURL = this.ori.pictureURL || "";
    this.status = this.ori.status || "";

  }

  addOrigin() {
    var origin = {
      id: this.id,
      name: this.name,
      description: this.description,
      status: this.status,
      file: this.file  // Thêm trường file vào đối tượng origin
    };

    this.adminService.addOrigin(origin).subscribe(
      (res) => {
        // Xử lý thành công
        alert("Origin added successfully!");
      },
      (error) => {
        // Xử lý lỗi
        console.error("Error adding origin:", error);
      }
    );
  }

  updateOrigin() {
    const origin = {
      id: this.id,
      name: this.name,
      description: this.description,
      status: this.status,
      file: this.file  // Thêm trường file vào đối tượng origin
    };

    this.adminService.updateOrigin(origin).subscribe(res => {
      alert(res.toString());
    });
  }

  uploadPhoto(event: any) {
    const file = event.target.files[0];
    this.file = file;

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.pictureURL = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // addOrigin() {
  //   var origin = {
  //     id: this.id,
  //     name: this.name,
  //     description: this.description,
  //     pictureURL: this.pictureURL,
  //     status: this.status
  //   };
  //   this.adminService.addOrigin(origin).subscribe(res => {
  //     alert(res.toString());
  //   });
  // }

  // updateOrigin() {
  //   var origin = {
  //     id: this.id,
  //     name: this.name,
  //     description: this.description,
  //     pictureURL: this.pictureURL,
  //     status: this.status
  //   };
  //   this.adminService.updateOrigin(origin).subscribe(res => {
  //     alert(res.toString());
  //   });
  // }

  // uploadPhoto(event: any) {
  //   var file = event.target.files[0];
  //   const formData: FormData = new FormData();
  //   formData.append('file', file, file.name);

  //   this.adminService.uploadPhoto(formData).subscribe((data: any) => {
  //     this.pictureURL = data.toString();
  //   })
  // }
 
}
