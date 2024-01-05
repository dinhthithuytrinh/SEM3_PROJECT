import { Component } from '@angular/core';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-nav-client',
  templateUrl: './nav-client.component.html',
  styleUrls: ['./nav-client.component.scss'],
})
export class NavClientComponent {
  faCartArrowDown = faCartArrowDown;
}
