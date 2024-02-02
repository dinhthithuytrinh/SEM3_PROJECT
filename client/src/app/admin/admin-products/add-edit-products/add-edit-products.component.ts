import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AdminService } from '../../admin.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { IType } from '../../../models/IType';
import { IOrigin } from '../../../models/IOrigin';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-add-edit-products',
  templateUrl: './add-edit-products.component.html',
  styleUrls: ['./add-edit-products.component.scss'],
})
export class AddEditProductsComponent implements OnInit {
  selectedFile: File | null = null;
  productForm!: FormGroup;
  types: IType[] = []; // Array to hold product types
  origins: IOrigin[] = []; // Array to hold product brands
  imageReturn: string = '';

  baseUrl = 'http://localhost:5000/api/';
  @Input() selectedProduct: any;
  @Input() mode: 'add' | 'edit' = 'add';
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private adminService: AdminService
  ) {}
  // Declare and initialize selectedProductType

  ngOnInit(): void {
    this.imageReturn = this.selectedProduct.pictureUrl;
    this.productForm = this.fb.group({
      id: [''],
      productCode: [''],
      name: [''],
      description: [''],
      price: [''],
      productBrand: [''],
      productType: [''],
      quantity: [''],
      status: [true],
      file: [null],
      pictureUrl: [''],
    });
    forkJoin({
      types: this.adminService.getTypes(),
      origins: this.adminService.getOrigins(),
    }).subscribe(({ types, origins }) => {
      this.types = types;
      this.origins = origins;
      if (
        this.mode === 'edit' &&
        this.selectedProduct &&
        this.origins &&
        this.types
      ) {
        // Initialize form with data for editing
        console.log(this.selectedProduct.id);
        console.log(this.selectedProduct.name);
        console.log(this.selectedProduct.description);
        console.log(this.selectedProduct.price);
        console.log(this.selectedProduct.pictureUrl);

        this.productForm.patchValue({
          id: this.selectedProduct.id,
          name: this.selectedProduct.name,
          description: this.selectedProduct.description,
          price: this.selectedProduct.price,
          productType: this.selectedProduct.productType,
          productBrand: this.selectedProduct.productBrand,
          quantity: this.selectedProduct.quantity,
          status: this.selectedProduct.status,
          pictureUrl: this.selectedProduct.pictureUrl,
          // You may need to handle the file separately for editing
        });
      }
    });
  }
  getProductName(id: number, array: any[]): string {
    const item = array.find((item) => item.id === id);
    return item ? item.name : '';
  }

  onSelectFile(fileInput: any) {
    this.selectedFile = <File>fileInput.target.files[0];
    this.productForm.patchValue({
      file: this.selectedFile,
    });
  }
  submitForm(action: string) {
    // Kiểm tra hành động và gọi hàm tương ứng
    if (action === 'create') {
      this.createProduct(this.productForm.value);
    } else if (action === 'update') {
      this.updateProduct(this.productForm.value);
    }
  }
  generateRandomCode(): number {
    const min = 1000000; // Smallest 7-digit number
    const max = 9999999; // Largest 7-digit number
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  createProduct(data: any) {
    data.productCode = this.generateRandomCode();
    //console.log('data', data);
    var fileUpLoadProduct = new FormData();
    fileUpLoadProduct.append('Name', data.name);
    fileUpLoadProduct.append('Description', data.description);
    fileUpLoadProduct.append('price', data.price);
    fileUpLoadProduct.append('productType', data.productType);
    fileUpLoadProduct.append('productBrand', data.productBrand);
    fileUpLoadProduct.append('quantity', data.quantity);
    fileUpLoadProduct.append('status', data.status);
    if (this.selectedFile) {
      fileUpLoadProduct.append(
        'picture',
        this.selectedFile,
        this.selectedFile.name
      );
    }

    this.http
      .post(this.baseUrl + 'products', fileUpLoadProduct)
      .subscribe((response) => {
        alert('Product created successfully!');
      });
    this.closeModal.emit();

    this.productForm.reset();
  }
  updateProduct(data: any) {
    // Lấy ID của sản phẩm cần cập nhật
    const productId = data.id;

    // Tạo FormData mới để chứa dữ liệu cần cập nhật
    const formData = new FormData();
    formData.append('Name', data.name);
    formData.append('Description', data.description);
    formData.append('price', data.price);
    formData.append('productType', data.productType);
    formData.append('productBrand', data.productBrand);
    formData.append('quantity', data.quantity);
    formData.append('status', data.status);
    formData.append('id', data.id);
    // Kiểm tra nếu có tệp được chọn
    if (this.selectedFile) {
      formData.append('picture', this.selectedFile, this.selectedFile.name);
    } else {
      formData.append(
        'pictureUrl',
        data.pictureUrl.replace('https://localhost:5001/', '')
      );
    }
    // Gửi yêu cầu cập nhật lên máy chủ
    this.http
      .put(this.baseUrl + `products`, formData)
      .subscribe((response: any) => {
        // Kiểm tra nếu có hình ảnh cũ
        if (data.pictureUrl && this.selectedFile) {
          // Xóa hình ảnh cũ từ cơ sở dữ liệu
          this.http
            .delete(this.baseUrl + `products/${productId}/image`)
            .subscribe(() => {
              // Xóa hình ảnh cũ từ hệ thống tệp
              this.deleteOldImage(data.pictureUrl);
            });
        }
        alert('Product updated successfully!');
      });
  }

  deleteOldImage(pictureUrl: string) {
    // Thực hiện logic để xóa hình ảnh cũ từ hệ thống tệp
    // Ví dụ: gửi yêu cầu đến máy chủ để xóa hình ảnh cũ từ hệ thống tệp
    this.http.delete(pictureUrl).subscribe(() => {
      console.log('Old image deleted successfully');
    });
  }
}
