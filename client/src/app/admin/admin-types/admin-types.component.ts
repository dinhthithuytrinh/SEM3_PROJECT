import { Component, OnInit } from '@angular/core';
import { IOrigin } from 'src/app/models/IOrigin';
import { AdminService } from '../admin.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-types',
  templateUrl: './admin-types.component.html',
  styleUrls: ['./admin-types.component.scss']
})
export class AdminTypesComponent implements OnInit {
 // Declare the form group
  constructor(private fb: FormBuilder, private adminService: AdminService) {
    this.typeForm = this.fb.group({ // Initialize originForm using FormBuilder
      id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: [true, Validators.required],
      file: [null]
    });
  }
  typeForm!: FormGroup;
  TypesList: any = [];
  ModalTitle = "";
  ActivateAddEditTypeComponent: boolean = false;
  typ: any;
  TypesIdFilter = "";
  TypesNameFilter = "";
  TypesListWithoutFilter: any = [];
  selectedType: any;

  ngOnInit(): void {
      this.refreshOriginsList();
  }

  addClick() {
    this.typ = {
      id: "0",
      name: "",
      description: "",
      pictureURL: "",
      status: true,
      file: null  // Thêm trường file và gán giá trị null
    }
    this.ModalTitle = "Add Types";
    this.ActivateAddEditTypeComponent = true;
  }

  editClick(item: any) {
   if (item && item.id !== "0") {
    this.selectedType = item; // Lưu thông tin của origin được chọn vào selectedOrigin
    this.ModalTitle = "Edit Types"; // Đặt tiêu đề modal thành "Edit Origins"
    this.ActivateAddEditTypeComponent = true; // Hiển thị thành phần add-edit origin
  }
  }

  deleteClick(item: any) {
    if (confirm('Are you sure??')) {
      this.adminService.deleteType(item.id).subscribe(data => {
        alert(data);
        this.refreshOriginsList();
      })
    }
  }

  closeClick() {
    this.ActivateAddEditTypeComponent = false;
    this.refreshOriginsList();
  }

  refreshOriginsList() {
    this.adminService.getTypes().subscribe(data => {
      this.TypesList = data;
      this.TypesListWithoutFilter = data;
    });
  }

  sortResult(prop: any, asc: any) {
    this.TypesList = this.TypesListWithoutFilter.sort(function (a: any, b: any) {
      if (asc) {
        return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
      }
      else {
        return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
      }
    });
  }

  FilterFn() {
    var OriginsIdFilter = this.TypesIdFilter;
    var OriginsNameFilter = this.TypesNameFilter;

    this.TypesList = this.TypesListWithoutFilter.filter(
      function (el: any) {
        return el.DepartmentId.toString().toLowerCase().includes(
          OriginsIdFilter.toString().trim().toLowerCase()
        ) &&
          el.DepartmentName.toString().toLowerCase().includes(
            OriginsNameFilter.toString().trim().toLowerCase())
      }
    );
  }

}