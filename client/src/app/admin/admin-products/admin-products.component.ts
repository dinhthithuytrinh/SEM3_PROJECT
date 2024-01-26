import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/IProduct';
import { AdminService } from '../admin.service';


import { IType } from 'src/app/models/IType';
import { IOrigin } from 'src/app/models/IOrigin';

import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  
  products: any = [];
  types: IType[] = [];
  origins: IOrigin[] = [];

  product: IProduct = {
    id: 0,
    productCode: 0,
    name: '',
    description: '',
    price: 0,
    pictureUrl: '',
    productType: '',
    productBrand: '',
    quantity: 0,
    status: false,
    createdBy: new Date(),
    updateBy: new Date(),
  };

  ActivateAddEditProductsComponent: boolean = false;
  ModalTitle = "";
  ProductList: any = [];
  ProductListWithoutFilter: any = [];
  pro: any;

  statuses: { value: boolean; label: string }[] = [
    { value: true, label: 'True' },
    { value: false, label: 'False'},
  ];

  displayForm = false;

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.getProducts();
    this.adminService.getTypes().subscribe(types => {
      this.types = types;
    });
  
    this.adminService.getOrigins().subscribe(origins => {
      this.origins = origins;
    });
  }

  getProducts(): void {
    this.adminService
      .getProducts('asc', 1, 10)
      .subscribe((response) => (this.products = response?.data || []));
  }

  // toggleForm(): void {
  //   this.displayForm = !this.displayForm;
  // }
  addClick() {
    this.pro = {
      id: "0",
      name: "",
      description: "",
      price: "",
      pictureURL: "",
      productType: "",
      productBrand: "",
      quantity: "0",
      status: true,
      file: null  // Thêm trường file và gán giá trị null
    }
    this.ModalTitle = "Add Product";
    this.ActivateAddEditProductsComponent = true;
  }

  editProduct(item: any): void {
    // // Thiết lập giá trị của product để form hiển thị nó
    // this.product = { ...product };
    // // this.toggleForm(); // Hiển thị form
    this.pro = item;
    this.ModalTitle = "Edit Product";
    this.ActivateAddEditProductsComponent = true;
  }


  closeClick() {
    this.ActivateAddEditProductsComponent = false;
    this.refreshProductList();
  }
  refreshProductList() {
    this.getProducts();
  }
  // *****

  // saveProduct(): void {
  //   // Thêm logic để lưu sản phẩm
  //   if (this.product.id) {
  //     // Nếu product đã có id, thực hiện logic cập nhật sản phẩm
  //     // Gọi service để cập nhật sản phẩm
  //     this.adminService.updateProduct(this.product)
  //       .subscribe(updatedProduct => {
  //         // Xử lý khi sản phẩm được cập nhật thành công
  //         console.log('Product updated successfully:', updatedProduct);
  //         // Sau khi cập nhật, có thể cần làm mới danh sách sản phẩm
  //         this.getProducts();
  //         // Ẩn form hoặc thực hiện các thao tác cần thiết
  //         this.toggleForm();
  //       });
  //   } else {
  //     // Nếu product chưa có id, thực hiện logic thêm mới sản phẩm
  //     // Gọi service để thêm mới sản phẩm
  //     this.adminService.addProduct(this.product)
  //       .subscribe(newProduct => {
  //         // Xử lý khi sản phẩm được thêm mới thành công
  //         console.log('Product added successfully:', newProduct);
  //         // Sau khi thêm mới, có thể cần làm mới danh sách sản phẩm
  //         this.getProducts();
  //         // Ẩn form hoặc thực hiện các thao tác cần thiết
  //         this.toggleForm();
  //       });
  //   }
  // }

    

    deleteProduct(): void {
      this.adminService.deleteProduct(this.product.id! as number)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.router.navigate(['/products']);
          },
          error: (e) => console.error(e)
        });
    }
}