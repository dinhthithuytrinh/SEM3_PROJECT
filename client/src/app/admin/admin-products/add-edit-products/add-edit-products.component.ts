import { Component, Input, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';


@Component({
  selector: 'app-add-edit-products',
  templateUrl: './add-edit-products.component.html',
  styleUrls: ['./add-edit-products.component.scss']
})
export class AddEditProductsComponent implements OnInit {

  addProduct() {
    throw new Error('Method not implemented.');
  }

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.id = this.pro.id;
    this.productCode = this.productCode;
    this.name = this.pro.name;
    this.description = this.pro.description;
    this.price = this.pro.price;
    this.productType = this.pro.productType;
    this.productBrand = this.pro.productBrand;
    this.pictureURL = this.pro.pictureURL || "";
    this.status = this.pro.status || "";
  }

  @Input() pro: any;
  id = "";
  productCode = "";
  name = "";
  description = "";
  price = "";
  pictureURL = "";
  productType = "";
  productBrand = "";
  quantity = "";
  status = true;
  file: File | null = null;
  
  updateProduct() {
    const product = {
      id: this.id,
      productCode: this.productCode,
      name: this.name,
      description: this.description,
      price: this.price,
      productType: this.productType,
      productBrand: this.productBrand,
      quantity: this.quantity,
      status: this.status,
      file: this.file  // Thêm trường file vào đối tượng origin
    };

    // this.adminService.updateProduct(product).subscribe(res => {
    //   alert(res.toString());
    // });
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
}
