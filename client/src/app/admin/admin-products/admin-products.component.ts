import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/IProduct';
import { AdminService } from '../admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IType } from 'src/app/models/IType';
import { IOrigin } from 'src/app/models/IOrigin';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPagination } from 'src/app/models/IPagination';
import { forkJoin, tap } from 'rxjs';
import { SharedService } from 'src/app/services/shareservice.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
 // Declare the form group
  constructor(private fb: FormBuilder, private adminService: AdminService,private sharedService: SharedService) {
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
  searchTerm: string = '';
  types: IType[] = []; // Declare types property here
  origins: IOrigin[] = []; // Declare types property here
  productForm!: FormGroup;
  ProductsList: IProduct [] = [];
  ModalTitle = "";
  ActivateAddEditProductComponent: boolean = false;
  pro: any;
  ProductsIdFilter = "";
  PruductsNameFilter = "";
  ProductsListWithoutFilter: any = [];
  filteredProductList: IProduct[] = [];

  selectedProduct: any;

  ngOnInit(): void {
      this.refreshProductsList();
    // Lắng nghe sự thay đổi của searchTerm từ service
    this.sharedService.currentSearchTerm.subscribe((term: string) => { // Đặt kiểu dữ liệu của term là string
      this.searchTerm = term;
      this.applyFilter(); // Gọi phương thức apply
    });

    // Lấy danh sách nguồn từ API hoặc từ nơi khác
    

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
        this.selectedProduct.productBrandId = this.selectedProduct.productBrandId || ''; // Gán giá trị mặc định nếu không có giá trị
      this.selectedProduct.productBrandId = this.selectedProduct.productBrandId || ''; // Gán giá trị mặc định nếu không có giá trị
      this.ActivateAddEditProductComponent = true;
    });
  }
}
 fetchTypes() {
  return this.adminService.getTypes().pipe(
    tap((types: IType[]) => {
      console.log('Types from API:', types); // Kiểm tra dữ liệu được trả về từ API
      this.types = types; // Gán dữ liệu cho biến this.types
    })
  );
}

fetchOrigins() {
  return this.adminService.getOrigins().pipe(
    tap((origins: IOrigin[]) => {
      console.log('Origins from API:', origins); // Kiểm tra dữ liệu được trả về từ API
      this.origins = origins; // Gán dữ liệu cho biến this.origins
    })
  );
}

  deleteClick(item: any) {
    if (confirm('Are you sure??')) {
      this.adminService.deleteProduct(item.id).subscribe(data => {
        alert('Product deleted successfully');
        item.status = false;
      })
      location.reload(); // Tải lại trang
    }
  }

  closeClick() {
    this.ActivateAddEditProductComponent = false;
    this.refreshProductsList();
  }

  closeAddEditModal() {
    // Tìm đối tượng modal và đóng nó
    const modal = document.getElementById('staticBackdrop');
    const modalBackdrop = document.getElementsByClassName('modal-backdrop')[0] as HTMLElement;
  
    if (modal && modalBackdrop) {
      modal.classList.remove('show'); // Xóa class 'show' để ẩn modal
      modal.setAttribute('aria-hidden', 'true'); // Thiết lập thuộc tính 'aria-hidden' để ẩn modal từ trình đọc màn hình
  
      modalBackdrop.classList.remove('show'); // Xóa class 'show' để ẩn backdrop
      modalBackdrop.parentElement?.removeChild(modalBackdrop); // Loại bỏ backdrop khỏi DOM
  
      //window.scrollTo(0, 0); // Cuộn trang lên đầu
      location.reload(); // Tải lại trang
    }
  }
   onCloseModal() {
      this.closeAddEditModal(); // Call the method to close the modal
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
         
        //this.OriginsListWithoutFilter = Array.isArray(data) ? data : [];
        
        // Đảm bảo rằng filteredOriginsList và OriginsList cũng được cập nhật
        this.filteredProductList = [...this.ProductsList];
        this.ProductsList = [...this.filteredProductList];

        // Áp dụng bộ lọc khi danh sách được làm mới
        this.applyFilter();
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

 
  applyFilter() {
    if (this.searchTerm.trim().length > 0) { // Sử dụng trim() để loại bỏ khoảng trắng thừa và kiểm tra độ dài của từ khóa tìm kiếm
        // Sử dụng phương thức filter để lọc danh sách theo trường "id" và "name"
        this.filteredProductList = this.ProductsList.filter(product =>
            product.id.toString().toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            product.productType.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            product.productBrand.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
    } else {
        // Nếu từ khóa tìm kiếm là rỗng hoặc chỉ chứa khoảng trắng, gán filteredOriginsList là một bản sao của OriginsList
        this.filteredProductList = [...this.ProductsList];
    }
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