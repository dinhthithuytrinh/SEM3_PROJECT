import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() { }

   filterOrigins(originsList: any[], originsListWithoutFilter: any[], originsIdFilter: string, originsNameFilter: string) {
    return originsListWithoutFilter.filter((el: any) => {
      return el.DepartmentId.toString().toLowerCase().includes(originsIdFilter.toString().trim().toLowerCase()) &&
        el.DepartmentName.toString().toLowerCase().includes(originsNameFilter.toString().trim().toLowerCase());
    });
  }
}
