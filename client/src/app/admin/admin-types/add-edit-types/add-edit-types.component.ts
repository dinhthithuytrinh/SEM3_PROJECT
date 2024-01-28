import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AdminService } from '../../admin.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-edit-types',
  templateUrl: './add-edit-types.component.html',
  styleUrls: ['./add-edit-types.component.scss'],
})
export class AddEditTypesComponent implements OnInit {
  selectedFile: File | null = null;
  typeForm!: FormGroup;
  baseUrl = 'http://localhost:5000/api/products/';
 @Input() selectedType: any;
  @Input() mode: 'add' | 'edit' = 'add';
 @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  constructor(private http: HttpClient,private fb: FormBuilder , private adminService: AdminService) {}

  ngOnInit(): void {
    this.typeForm = this.fb.group({
      id: [''],
      name: [''],
      description: [''],
      status: [true],
      file: [null],
    });
   if (this.mode === 'edit' && this.selectedType) {
      // Initialize form with data for editing
      this.typeForm.patchValue({
        id: this.selectedType.id,
        name: this.selectedType.name,
        description: this.selectedType.description,
        status: this.selectedType.status,
        // You may need to handle the file separately for editing
      });
    }
    
  }
 

  onSelectFile(fileInput: any) {
    this.selectedFile = <File>fileInput.target.files[0];
    this.typeForm.patchValue({
      file: this.selectedFile,
    });
  }
   submitForm(action: string) {
    // Kiểm tra hành động và gọi hàm tương ứng
    if (action === 'create') {
      this.createType(this.typeForm.value);
    } else if (action === 'update') {
      this.updateType(this.typeForm.value);
    }
  }

  createType(data: any) {
    console.log('data', data);
    var fileUpLoadProductType = new FormData();
    fileUpLoadProductType.append('Name', data.name);
    fileUpLoadProductType.append('Description', data.description);
    fileUpLoadProductType.append('status', data.status);

    if (this.selectedFile) {
      fileUpLoadProductType.append(
        'files',
        this.selectedFile,
        this.selectedFile.name
      );
    }

    this.http
      .post(this.baseUrl + 'types/Create/', fileUpLoadProductType)
      .subscribe((response) => {
        
        this.closeModal.emit();
        
      });

    this.typeForm.reset();
    console.log(data);
  }
  updateType(data: any) {
    // Lấy ID của nguồn gốc cần cập nhật
    const typeId = data.id;

    // Tạo FormData mới để chứa dữ liệu cần cập nhật
    const formData = new FormData();
    formData.append('Name', data.name);
    formData.append('Description', data.description);
    formData.append('status', data.status);
    formData.append('id', data.id);
    // Kiểm tra nếu có tệp được chọn
    if (this.selectedFile) {
      formData.append(
        'files',
        this.selectedFile,
        this.selectedFile.name
      );
    }

    // Gửi yêu cầu cập nhật lên máy chủ
    this.http
      .put(this.baseUrl + `types/Update/${typeId}`, formData)
      .subscribe((response) => {
        alert('Origin updated successfully!');
      });

    // Reset form sau khi cập nhật thành công
    this.typeForm.reset();
    
  }
}

//   @Input() ori: any;
//   // id = "";
//   // name = "";
//   // description = "";
//   pictureURL = "";
//   status = true;
//   file: File | null = null;

//   @Output() productsUpdate = new EventEmitter<IOrigin[]>;

//   ngOnInit(): void {
//     this.originForm = this.formBuilder.group({
//       id: [this.ori.id],
//       name: [this.ori.name, Validators.required],
//       description: [this.ori.description],
//       pictureURL: [this.ori.pictureURL],
//       status: [this.ori.status || true],
//       file: null
//     });
//   }

//   uploadPhoto(event: any) {

//       const file = event.target.files[0];
//       this.originForm.patchValue({file});

//   }

// onSubmit() {
//   const formData = new FormData(this.originForm.value);

//   if (this.ori.id === '0') {
//     this.createOrigin(formData);
//   } else {
//     this.updateOrigin(formData);
//   }
// }

//    createOrigin() {
//     const formdata = new FormData();

//     formdata.append('name',this.originForm)
//     this.adminService.addOrigin(formdata).subscribe(
//       (response) => {
//         // Success
//         this.originForm.reset();
//         this.ori = response;
//       },
//       error => {
//         // Error
//         console.error('Error creating origin:', error);
//       }
//     );
//   }

//   private updateOrigin(formData: FormData) {
//     this.adminService.updateOrigin(formData).subscribe(
//       (response) => {
//         // Success
//         this.originForm.reset();
//         this.ori = response;
//       },
//       error => {
//         // Error
//         console.error('Error updating origin:', error);
//       }
//     );
//   }

//   // onSubmit() {
//   //   const formData = new FormData(this.originForm.value);

//   //   if (this.ori.id === '0') {
//   //     // Create origin
//   //     this.adminService.addOrigin(formData).subscribe(
//   //       (response: IOrigin) => {
//   //         // Success
//   //         this.originForm.reset();
//   //         this.ori = response;
//   //       },
//   //       error => {
//   //         // Error
//   //         console.error('Error creating origin:', error);
//   //       }
//   //     );
//   //   } else {
//   //     // Update origin
//   //     this.adminService.updateOrigin(formData).subscribe(
//   //       (response: IOrigin) => {
//   //         // Success
//   //         this.originForm.reset();
//   //         this.ori = response;
//   //       },
//   //       error => {
//   //         // Error
//   //         console.error('Error updating origin:', error);
//   //       }
//   //     );
//   //   }
//   // }

//   // addOrigin(){
//   //   //   if (!this.product.productTypeId) {
//   //   //   console.error('Invalid ProductTypeId. Please provide a valid identifier.');
//   //   //   return;
//   //   // }
//   //   //  if (!this.product.productBrandId) {
//   //   //   console.error('Invalid ProductBrandId. Please provide a valid identifier.');
//   //   //   return;
//   //   // }
//   // const formattedDate = (date: Date) => date.toISOString(); // Format date to string
//   //      const formData = new FormData();
//   //      const origin = this.originForm.value;
//   //   formData.append('name', origin.name);
//   //   formData.append('description', origin.description); // Assuming description is a string
//   //   formData.append('pictureUrl', origin.pictureUrl); // Assuming pictureUrl is a string
//   //   formData.append('status',  origin.status ? 'true' : 'false'); // Assuming status is a boolean
//   //    formData.append('createdBy', formattedDate(new Date()));
//   //   formData.append('updateBy', formattedDate(new Date()));
//   //    if (origin.files && origin.files instanceof FileList && origin.files.length > 0) {
//   //     formData.append('files', origin.files[0]);

//   //   }

//   //     this.adminService.addOrigin(formData).subscribe((origins: IOrigin[])=> {this.productsUpdate.emit(origins);

//   //     },(error) => {console.log(error);})
//   //   console.log(this.ori);

//   //     }

//   deleteOrigin() {
//     if (this.ori.id !== '0') {
//       // Confirm delete
//       const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa?');

//       if (confirmDelete) {
//         // Delete origin
//         this.adminService.deleteOrigin(this.ori.id).subscribe(
//           () => {
//             // Success
//             this.originForm.reset();
//           },
//           error => {
//             // Error
//             console.error('Error deleting origin:', error);
//           }
//         );
//       }
//     }
//   }

//   // addOrigin() {
//   //   var origin = {
//   //     id: this.id,
//   //     name: this.name,
//   //     description: this.description,
//   //     status: this.status,
//   //     file: this.file  // Thêm trường file vào đối tượng origin
//   //   };

//   //   this.adminService.addOrigin(origin).subscribe(
//   //     (res) => {
//   //       // Xử lý thành công
//   //       alert("Origin added successfully!");
//   //     },
//   //     (error) => {
//   //       // Xử lý lỗi
//   //       console.error("Error adding origin:", error);
//   //     }
//   //   );
//   // }

//   // updateOrigin() {
//   //   const origin = {
//   //     id: this.id,
//   //     name: this.name,
//   //     description: this.description,
//   //     status: this.status,
//   //     file: this.file  // Thêm trường file vào đối tượng origin
//   //   };

//   //   this.adminService.updateOrigin(origin).subscribe(res => {
//   //     alert(res.toString());
//   //   });
//   // }

//   // uploadPhoto(event: any) {
//   //   const file = event.target.files[0];
//   //   this.file = file;

//   //   if (file) {
//   //     const reader = new FileReader();
//   //     reader.onload = (e: any) => {
//   //       this.pictureURL = e.target.result;
//   //     };
//   //     reader.readAsDataURL(file);
//   //   }
//   // }

//   // addOrigin() {
//   //   var origin = {
//   //     id: this.id,
//   //     name: this.name,
//   //     description: this.description,
//   //     pictureURL: this.pictureURL,
//   //     status: this.status
//   //   };
//   //   this.adminService.addOrigin(origin).subscribe(res => {
//   //     alert(res.toString());
//   //   });
//   // }

//   // updateOrigin() {
//   //   var origin = {
//   //     id: this.id,
//   //     name: this.name,
//   //     description: this.description,
//   //     pictureURL: this.pictureURL,
//   //     status: this.status
//   //   };
//   //   this.adminService.updateOrigin(origin).subscribe(res => {
//   //     alert(res.toString());
//   //   });
//   // }

//   // uploadPhoto(event: any) {
//   //   var file = event.target.files[0];
//   //   const formData: FormData = new FormData();
//   //   formData.append('file', file, file.name);

//   //   this.adminService.uploadPhoto(formData).subscribe((data: any) => {
//   //     this.pictureURL = data.toString();
//   //   })
//   // }

// }
