import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  type: string = 'password';

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  returnUrl: string;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.returnUrl =
      this.activatedRoute.snapshot.queryParams['returnUrl'] || '/shop';
  }
  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }
  onSubmit() {
    this.accountService.login(this.loginForm.value).subscribe({
      next: () => this.router.navigateByUrl(this.returnUrl),
    });
  }
}
