import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/IProduct';
import { AdminService } from '../admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IType } from 'src/app/models/IType';
import { IOrigin } from 'src/app/models/IOrigin';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPagination } from 'src/app/models/IPagination';
import { forkJoin, tap } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
 // Declare the form group
  constructor(private fb: FormBuilder, private adminService: AdminService) {
    this.productForm = this.fb.group({ // Initialize originForm using FormBuilder
      id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      productTypeId: ['', Validators.required],
      productBrandId: ['', Validators.required],
      quantity: ['', Validators.required],
      status: [true, Validators.required],
      file: [null]
    });
  }
  types: IType[] = []; // Declare types property here
  origins: IOrigin[] = []; // Declare types property here
  productForm!: FormGroup;
  ProductsList: any = [];
  ModalTitle = "";
  ActivateAddEditProductComponent: boolean = false;
  pro: any;
  ProductsIdFilter = "";
  PruductsNameFilter = "";
  ProductsListWithoutFilter: any = [];
  selectedProduct: any;

  ngOnInit(): void {
      this.refreshProductsList();
  }

  addClick() {
    this.pro = {
      id: "0",
      name: "",
      description: "",
      price:"",
      productTypeId: "",
      productBrandId: "",
      quantity: "",
      pictureURL: "",
      status: true,
      file: null  // Thêm trường file và gán giá trị null
    }
    this.ModalTitle = "Add Product";
    this.ActivateAddEditProductComponent = true;
  }


 editClick(item: any) {
  if (item && item.id !== "0") {
    this.selectedProduct = item;
    this.ModalTitle = "Edit Product";

    // Wait for both fetch operations to complete
    forkJoin([
      this.fetchTypes(),
      this.fetchOrigins()
    ]).subscribe(() => {
      this.ActivateAddEditProductComponent = true;
    });
  }
  console.log(item)
}
  fetchTypes() {
  return this.adminService.getTypes().pipe(
    tap((types: IType[]) => {
      this.types = types;
    })
  );
}

fetchOrigins() {
  return this.adminService.getOrigins().pipe(
    tap((origins: IOrigin[]) => {
      this.origins = origins;
    })
  );
}

  deleteClick(item: any) {
    if (confirm('Are you sure??')) {
      this.adminService.deleteProduct(item.id).subscribe(data => {
        alert(data);
        this.refreshProductsList();
      })
    }
  }

  closeClick() {
    this.ActivateAddEditProductComponent = false;
    this.refreshProductsList();
  }

refreshProductsList() {
   const sort = 'default'; // Provide a default value for sort
  const pageNumber = 1; // Provide a default value for pageNumber
  const pageSize = 10; // Provide a default value for pageSize
  this.adminService.getProducts(sort, pageNumber, pageSize).subscribe(
    (data: IPagination | null) => {
      if (data) {
        this.ProductsList = data.data; // Assuming 'results' contains the list of products in IPagination
        this.ProductsListWithoutFilter = data;
      } else {
        console.error('Error fetching products: Data is null');
      }
    },
    (error: any) => {
      console.error('Error fetching products:', error);
    }
  );
}

  sortResult(prop: any, asc: any) {
    this.ProductsList = this.ProductsListWithoutFilter.sort(function (a: any, b: any) {
      if (asc) {
        return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
      }
      else {
        return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
      }
    });
  }

  FilterFn() {
    var ProductsIdFilter = this.ProductsIdFilter;
    var ProductsNameFilter = this.PruductsNameFilter;

    this.ProductsList = this.ProductsListWithoutFilter.filter(
      function (el: any) {
        return el.DepartmentId.toString().toLowerCase().includes(
          ProductsIdFilter.toString().trim().toLowerCase()
        ) &&
          el.DepartmentName.toString().toLowerCase().includes(
            ProductsNameFilter.toString().trim().toLowerCase())
      }
    );
  }

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

    

    // deleteProduct(): void {
    //   this.adminService.deleteProduct(this.product.id! as number)
    //     .subscribe({
    //       next: (res) => {
    //         console.log(res);
    //         this.router.navigate(['/products']);
    //       },
    //       error: (e) => console.error(e)
    //     });
    // }
}