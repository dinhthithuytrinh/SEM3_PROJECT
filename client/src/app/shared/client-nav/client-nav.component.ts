import { Component } from '@angular/core';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-client-nav',
  templateUrl: './client-nav.component.html',
  styleUrls: ['./client-nav.component.scss'],
})
export class ClientNavComponent {
  faCartArrowDown = faCartArrowDown;
}
