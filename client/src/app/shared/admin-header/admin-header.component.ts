import { Component } from '@angular/core';
import { FilterService } from '../services/filter.service';
import { SharedService } from 'src/app/services/shareservice.service';


@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent {
  
  
  constructor(private sharedService: SharedService) {}

 updateSearchTerm(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target) {
    const searchTerm = target.value.trim(); // Lưu ý: Sử dụng trim() để loại bỏ các khoảng trắng thừa
    if (searchTerm !== '' || searchTerm == "") {
      this.sharedService.changeSearchTerm(searchTerm);
    }
  }
}

}
