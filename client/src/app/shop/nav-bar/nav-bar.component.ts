import { Component } from '@angular/core';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav-bar',
  templateUrl: '././nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  faCartArrowDown = faCartArrowDown;
}
