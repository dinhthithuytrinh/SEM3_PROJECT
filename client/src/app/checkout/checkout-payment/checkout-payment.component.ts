import { Component, Input } from '@angular/core';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { Basket, IBasket, IBasketItem } from '../../models/Basket';
import { Address } from '../../models/User';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NavigationExtras, Router } from '@angular/router';
import { BasketService } from '../../basket/basket.service';
import { AccountService } from '../../account/account.service';
import { CheckoutService } from '../../checkout/checkout.service';
import { IOrder, IOrderToCreate } from '../../models/order';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss'],
})
export class CheckoutPaymentComponent {
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;

  payPalConfig?: IPayPalConfig;
  itemListToPaypal: any[] = [];
  basket?: IBasket;
  userAddress?: Address;
  orderIsSubmittedStatus = false;

  @Input() checkoutForm: FormGroup = new FormGroup({});

  constructor(
    private basketService: BasketService,
    private checkoutService: CheckoutService,
    private toastr: ToastrService,
    private router: Router,
    private accountService: AccountService
  ) {}

  submitOrder() {
    const basket = this.basketService.getCurrentBasketValue();
    const orderToCreate = this.getOrderToCreate(basket);
    this.checkoutService.createOrder(orderToCreate).subscribe(
      (order: IOrder) => {
        this.basketService.deleteBasket(basket);
        this.toastr.success('Order created successfully');
        this.basketService.deleteBasketWithoutCallingToAPI(basket.id);
        const navigationExtras: NavigationExtras = { state: order };
        this.router.navigate(['checkout/success'], navigationExtras);
        console.log(order);
      },
      (error) => {
        this.toastr.error(error.message);
        console.log(error);
      }
    );
  }

  private getOrderToCreate(basket: Basket): IOrderToCreate {
    const deliveryMethodId = this.checkoutForm
      ?.get('deliveryForm')
      ?.get('deliveryMethod')?.value;
    const shipToAddress = this.checkoutForm?.get('addressForm')
      ?.value as Address;
    if (!deliveryMethodId || !shipToAddress)
      throw new Error('Problem with basket');
    return {
      basketId: basket.id,
      deliveryMethodId: deliveryMethodId,
      shipToAddress: shipToAddress,
    };
  }

  ngOnInit(): void {
    this.accountService.getUserAddress().subscribe((address: Address) => {
      this.userAddress = address;
      console.log('aaaa');
      console.log(address);
      console.log(this.userAddress);
    });
    this.basket = this.basketService.getCurrentBasketValue();

    this.basket.items.forEach((item: IBasketItem) => {
      this.itemListToPaypal.push({
        name: item.productName.substring(0, 126),
        quantity: item.quantity.toString(),
        category: 'PHYSICAL_GOODS',
        unit_amount: {
          currency_code: 'USD',
          value: item.price.toFixed(2),
        },
      });
    });
  }

  submitOrderAndClearBasket(): void {
    let basket = this.basketService.getCurrentBasketValue();
    let orderToCreate = {
      basketId: basket.id,
      deliveryMethodId: +this.checkoutForm
        .get('deliveryForm')
        ?.get('deliveryMethod')?.value,
      shipToAddress: this.checkoutForm.get('addressForm')?.value,
    };

    this.checkoutService.createOrder(orderToCreate).subscribe(
      (order: IOrder) => {
        this.toastr.success('Order created successfully');
        this.basketService.deleteBasketWithoutCallingToAPI(basket.id);
        let navigationExtras: NavigationExtras = { state: order };
        this.router
          .navigate(['checkout/success'], navigationExtras)
          .then((r) => {});
      },
      (error) => {
        this.toastr.error(error.message);
        console.log(error);
      }
    );
  }

  showPaypalButtons(): void {
    this.initConfig();
    this.orderIsSubmittedStatus = true;
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId:
        'AWMH-v3wyJSJCa1Q7rw-C7w1jQvLjaplxHTbLsQC_SX7eHhqz6r3STFDmDSPfXfzDMdY0S3-LptnjhjA',
      createOrderOnClient: (data) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: this.basketService
                  .getCurrentTotalBasketValue()
                  .total.toFixed(2),
                breakdown: {
                  item_total: {
                    currency_code: 'USD',
                    value: this.basketService
                      .getCurrentTotalBasketValue()
                      .subtotal.toFixed(2),
                  },
                  shipping: {
                    currency_code: 'USD',
                    value: this.basketService
                      .getCurrentTotalBasketValue()
                      .shipping.toFixed(2),
                  },
                },
              },
              items: this.itemListToPaypal,
              shipping: {
                name: {
                  full_name:
                    this.userAddress!.firstName +
                    ' ' +
                    this.userAddress!.lastName,
                },
                address: {
                  address_line_1: this.userAddress!.street,
                  address_line_2: '',
                  admin_area_2: this.userAddress!.city,
                  admin_area_1: this.userAddress!.state,
                  postal_code: this.userAddress!.zipcode,
                  country_code: 'VN',
                },
              },
            },
          ],
        },
      advanced: {
        commit: 'true',
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
      },
      onApprove: (data, actions) => {
        console.log(
          'onApprove - transaction was approved, but not authorized',
          data,
          actions
        );
        actions.order.get().then((details: any) => {
          console.log(
            'onApprove - you can get full order details inside onApprove: ',
            details
          );
        });
      },
      onClientAuthorization: (data) => {
        console.log(
          'onClientAuthorization - you should probably inform your server about completed transaction at this point',
          data
        );
        this.submitOrderAndClearBasket();
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: (err) => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }
}
