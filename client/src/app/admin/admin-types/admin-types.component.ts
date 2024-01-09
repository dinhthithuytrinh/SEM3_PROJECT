import { Component, OnInit } from '@angular/core';
import { IType } from 'src/app/models/IType';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-types',
  templateUrl: './admin-types.component.html',
  styleUrls: ['./admin-types.component.scss']
})
export class AdminTypesComponent implements OnInit {
  types: IType[] = [];
  type: IType = {
    id: 0,
    name: '',
    description: '',
    pictureUrl: '',
    status: true,
    createdBy: new Date(),
    updateBy: new Date(),
  };

  displayForm = false;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getTypes();
  }

  getTypes(): void {
    this.adminService.getTypes()
      .subscribe(response => this.types = response || []);
  }

  toggleForm(): void {
    this.displayForm = !this.displayForm;
  }

  editType(type: IType): void {
    this.type = { ...type };
    this.toggleForm();
  }

  saveType(): void {
    if (this.type.id) {
      this.adminService.updateType(this.type)
        .subscribe(updatedType => {
          console.log('Type updated successfully:', updatedType);
          this.getTypes();
          this.toggleForm();
        });
    } else {
      this.adminService.addType(this.type)
        .subscribe(newType => {
          console.log('Type added successfully:', newType);
          this.getTypes();
          this.toggleForm();
        });
    }
  }

  deleteType(id: number): void {
    this.adminService.deleteType(id)
      .subscribe(() => {
        console.log('Type deleted successfully.');
        this.getTypes();
      });
  }
}
