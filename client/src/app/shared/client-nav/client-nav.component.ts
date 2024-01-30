import { Component } from '@angular/core';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import { BasketService } from '../../basket/basket.service';
import { AccountService } from '../../account/account.service';

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

  logout() {}
}
