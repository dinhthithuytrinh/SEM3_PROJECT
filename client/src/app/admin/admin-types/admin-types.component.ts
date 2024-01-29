import { Component, OnInit } from '@angular/core';
import { IOrigin } from 'src/app/models/IOrigin';
import { AdminService } from '../admin.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IType } from 'src/app/models/IType';
import { SharedService } from 'src/app/services/shareservice.service';

@Component({
  selector: 'app-admin-types',
  templateUrl: './admin-types.component.html',
  styleUrls: ['./admin-types.component.scss']
})
export class AdminTypesComponent implements OnInit {
 // Declare the form group
  constructor(private fb: FormBuilder, private adminService: AdminService,private sharedService: SharedService) {
    this.typeForm = this.fb.group({ // Initialize originForm using FormBuilder
      id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: [true, Validators.required],
      file: [null]
    });
  }
  searchTerm: string = '';
  typeForm!: FormGroup;
  TypesList: IType [] = [];
  ModalTitle = "";
  ActivateAddEditTypeComponent: boolean = false;
  typ: any;
  TypesIdFilter = "";
  TypesNameFilter = "";
  TypesListWithoutFilter: any = [];
  filteredTypesList: IOrigin[] = [];

  selectedType: any;

  ngOnInit(): void {
    this.refreshTypesList();
    // Lắng nghe sự thay đổi của searchTerm từ service
    this.sharedService.currentSearchTerm.subscribe(term => {
      this.searchTerm = term;
      this.applyFilter(); // Gọi phương thức applyFilter() khi searchTerm thay đổi
    });

    // Lấy danh sách nguồn từ API hoặc từ nơi khác
    
}

  addClick() {
    this.typ = {
      id: "0",
      name: "",
      description: "",
      pictureURL: "",
      status: true,
      file: null  // Thêm trường file và gán giá trị null
    }
    this.ModalTitle = "Add Types";
    this.ActivateAddEditTypeComponent = true;
  }

  editClick(item: any) {
   if (item && item.id !== "0") {
    this.selectedType = item; // Lưu thông tin của origin được chọn vào selectedOrigin
    this.ModalTitle = "Edit Types"; // Đặt tiêu đề modal thành "Edit Origins"
    this.ActivateAddEditTypeComponent = true; // Hiển thị thành phần add-edit origin
  }
  }

  deleteClick(item: any) {
    if (confirm('Are you sure??')) {
      this.adminService.deleteType(item.id).subscribe(data => {
        alert(data);
        this.refreshTypesList();
      })
    }
  }

  closeClick() {
    this.ActivateAddEditTypeComponent = false;
    this.refreshTypesList();
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
      location.reload();
    }
  }
   onCloseModal() {
      this.closeAddEditModal(); // Call the method to close the modal
    }
  

  refreshTypesList() {
    this.adminService.getTypes().subscribe(data => {
        // Kiểm tra nếu data là một mảng, nếu không, gán cho OriginsListWithoutFilter một mảng rỗng
        this.TypesList = data
        //this.OriginsListWithoutFilter = Array.isArray(data) ? data : [];
        
        // Đảm bảo rằng filteredOriginsList và OriginsList cũng được cập nhật
        this.filteredTypesList = [...this.TypesList];
        this.TypesList = [...this.filteredTypesList];

        // Áp dụng bộ lọc khi danh sách được làm mới
        this.applyFilter();
    });
  }
  applyFilter() {
    if (this.searchTerm.trim().length > 0) { // Sử dụng trim() để loại bỏ khoảng trắng thừa và kiểm tra độ dài của từ khóa tìm kiếm
        // Sử dụng phương thức filter để lọc danh sách theo trường "id" và "name"
        this.filteredTypesList = this.TypesList.filter(type =>
            type.id.toString().toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            type.name.toLowerCase().includes(this.searchTerm.toLowerCase())
          
        );
    } else {
        // Nếu từ khóa tìm kiếm là rỗng hoặc chỉ chứa khoảng trắng, gán filteredOriginsList là một bản sao của OriginsList
        this.filteredTypesList = [...this.TypesList];
        
    }
}

  sortResult(prop: any, asc: any) {
    this.TypesList = this.TypesListWithoutFilter.sort(function (a: any, b: any) {
      if (asc) {
        return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
      }
      else {
        return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
      }
    });
  }

  FilterFn() {
    var OriginsIdFilter = this.TypesIdFilter;
    var OriginsNameFilter = this.TypesNameFilter;

    this.TypesList = this.TypesListWithoutFilter.filter(
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