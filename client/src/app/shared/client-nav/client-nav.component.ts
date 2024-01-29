import { Component } from '@angular/core';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import { AccountService } from 'src/app/account/account.service';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-client-nav',
  templateUrl: './client-nav.component.html',
  styleUrls: ['./client-nav.component.scss'],
})
export class ClientNavComponent {
  faCartArrowDown = faCartArrowDown;
  constructor(
    public basketService: BasketService,
    public accountService: AccountService
  ) {}

  // getCount(items: BasketItem[]) {
  //   return items.reduce((sum, item) => sum + item.quantity, 0);
  // }
}
