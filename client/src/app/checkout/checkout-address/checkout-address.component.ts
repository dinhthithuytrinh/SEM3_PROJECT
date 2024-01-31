import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../account/account.service';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.scss'],
})
export class CheckoutAddressComponent {
  /// FontAwesome icons
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;

  @Input() checkoutForm: FormGroup = new FormGroup({});

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService
  ) {}

  saveUserAddress() {
    this.accountService
      .updateUserAddress(this.checkoutForm.get('addressForm')!.value)
      .subscribe(
        () => {
          console.log('bbbbb');
          this.toastr.success('Address saved');
        },
        (error) => {
          this.toastr.error(error.message);
          console.log(error);
        }
      );
  }
}
