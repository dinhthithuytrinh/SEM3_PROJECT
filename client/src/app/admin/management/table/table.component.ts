import { AdminService } from 'src/app/admin/admin.service';
import { Component, Input } from '@angular/core';
import { IProduct } from 'src/app/models/IProduct';
import { IType } from 'src/app/models/IType';
import { IOrigin } from 'src/app/models/IOrigin';
import { IPagination } from 'src/app/models/IPagination';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() products: IProduct[] | undefined;
  @Input() types: IType[] | undefined;
  @Input() origins: IOrigin[] | undefined;

  constructor(public router: Router, private adminService: AdminService) {}

  ngOnInit(): void {
    this.getTypes();
    this.getOrigins();
  }

  getTypes(): void {
    this.adminService.getTypes().subscribe({
      next: (response) =>
        (this.types = [
          {
            id: 0,
            name: 'All type',
            description: '',
            pictureUrl: '/assets/img/all.jpg',
            status: true,
          },
          ...response,
        ]),
      error: (err) => console.log(err),
    });
  }

  getOrigins(): void {
    this.adminService.getOrigins().subscribe({
      next: (response) =>
        (this.origins = [
          {
            id: 0,
            name: 'All origin',
            description: '',
            pictureUrl: '/assets/img/all.jpg',
            status: true,
          },
          ...response,
        ]),
      error: (err) => console.log(err),
    });
  }
}
