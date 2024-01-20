import { Component, OnInit } from '@angular/core';
import { IOrigin } from 'src/app/models/IOrigin';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-origins',
  templateUrl: './admin-origins.component.html',
  styleUrls: ['./admin-origins.component.scss']
})
export class AdminOriginsComponent implements OnInit {

  constructor(private adminService: AdminService) {}

  OriginsList: any = [];
  ModalTitle = "";
  ActivateAddEditOriginComponent: boolean = false;
  ori: any;

  OriginsIdFilter = "";
  OriginsNameFilter = "";
  OriginsListWithoutFilter: any = [];

  ngOnInit(): void {
      this.refreshOriginsList();
  }

  addClick() {
    this.ori = {
      id: "0",
      name: "",
      description: "",
      pictureURL: "",
      status: true,
      file: null  // Thêm trường file và gán giá trị null
    }
    this.ModalTitle = "Add Origins";
    this.ActivateAddEditOriginComponent = true;
  }

  editClick(item: any) {
    this.ori = item;
    this.ModalTitle = "Edit Origins";
    this.ActivateAddEditOriginComponent = true;
  }

  deleteClick(item: any) {
    if (confirm('Are you sure??')) {
      this.adminService.deleteOrigin(item.id).subscribe(data => {
        alert(data);
        this.refreshOriginsList();
      })
    }
  }

  closeClick() {
    this.ActivateAddEditOriginComponent = false;
    this.refreshOriginsList();
  }

  refreshOriginsList() {
    this.adminService.getOrigins().subscribe(data => {
      this.OriginsList = data;
      this.OriginsListWithoutFilter = data;
    });
  }

  sortResult(prop: any, asc: any) {
    this.OriginsList = this.OriginsListWithoutFilter.sort(function (a: any, b: any) {
      if (asc) {
        return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
      }
      else {
        return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
      }
    });
  }

  FilterFn() {
    var OriginsIdFilter = this.OriginsIdFilter;
    var OriginsNameFilter = this.OriginsNameFilter;

    this.OriginsList = this.OriginsListWithoutFilter.filter(
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