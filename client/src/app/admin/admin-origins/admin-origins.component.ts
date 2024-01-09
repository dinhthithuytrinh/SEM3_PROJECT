import { Component, OnInit } from '@angular/core';
import { IOrigin } from 'src/app/models/IOrigin';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-origins',
  templateUrl: './admin-origins.component.html',
  styleUrls: ['./admin-origins.component.scss']
})
export class AdminOriginsComponent implements OnInit {
  origins: IOrigin[] = [];

  origin: IOrigin = {
    id: 0,
    name: '',
    description: '',
    pictureUrl: '',
    status: true,
    createdBy: new Date(),
    updateBy: new Date()
  };

  displayForm = false;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getOrigins();
  }

  getOrigins(): void {
    this.adminService.getOrigins()
      .subscribe(response => this.origins = response || []);
  }

  toggleForm(): void {
    this.displayForm = !this.displayForm;
  }

  editOrigin(origin: IOrigin): void {
    this.origin = { ...origin };
    this.toggleForm();
  }

  saveOrigin(): void {
    if (this.origin.id) {
      this.adminService.updateOrigin(this.origin)
        .subscribe(updatedOrigin => {
          console.log('Origin updated successfully:', updatedOrigin);
          this.getOrigins();
          this.toggleForm();
        });
    } else {
      this.adminService.addOrigin(this.origin)
        .subscribe(newOrigin => {
          console.log('Origin added successfully:', newOrigin);
          this.getOrigins();
          this.toggleForm();
        });
    }
  }

  deleteOrigin(id: number): void {
    this.adminService.deleteOrigin(id)
      .subscribe(() => {
        console.log('Origin deleted successfully.');
        this.getOrigins();
      });
  }
}