import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/IProduct';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  products: IProduct[] = [];

  product: IProduct = {
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

  displayForm = false;

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.adminService
      .getProducts('asc', 1, 10)
      .subscribe((response) => (this.products = response?.data || []));
  }

  toggleForm(): void {
    this.displayForm = !this.displayForm;
  }

  editProduct(product: IProduct): void {
    // Thiết lập giá trị của product để form hiển thị nó
    this.product = { ...product };
    this.toggleForm(); // Hiển thị form
  }

  saveProduct(): void {
    // Thêm logic để lưu sản phẩm
    if (this.product.id) {
      // Nếu product đã có id, thực hiện logic cập nhật sản phẩm
      // Gọi service để cập nhật sản phẩm
      this.adminService.updateProduct(this.product)
        .subscribe(updatedProduct => {
          // Xử lý khi sản phẩm được cập nhật thành công
          console.log('Product updated successfully:', updatedProduct);
          // Sau khi cập nhật, có thể cần làm mới danh sách sản phẩm
          this.getProducts();
          // Ẩn form hoặc thực hiện các thao tác cần thiết
          this.toggleForm();
        });
    } else {
      // Nếu product chưa có id, thực hiện logic thêm mới sản phẩm
      // Gọi service để thêm mới sản phẩm
      this.adminService.addProduct(this.product)
        .subscribe(newProduct => {
          // Xử lý khi sản phẩm được thêm mới thành công
          console.log('Product added successfully:', newProduct);
          // Sau khi thêm mới, có thể cần làm mới danh sách sản phẩm
          this.getProducts();
          // Ẩn form hoặc thực hiện các thao tác cần thiết
          this.toggleForm();
        });
    }
  }

  deleteProduct(productId: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.adminService
        .deleteProduct(productId)
        .subscribe(() => this.getProducts());
    }
  }
}