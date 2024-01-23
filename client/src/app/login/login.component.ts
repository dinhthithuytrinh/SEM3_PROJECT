import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import ValidateForm from '../helpers/validationform';
// import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  type: string = 'password';
  constructor(
    private fb: FormBuilder,
    // private auth: AuthService,
    // private router: Router,
    // private toast: NgToastService,
    // private userStore: UserStoreService
  ) {}
  ngOnInit () {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  
  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      // this.auth.signIn(this.loginForm.value).subscribe({
      //   next: (res) => {
      //     console.log(res.message);
      //     this.loginForm.reset();
      //     this.auth.storeToken(res.token);
      //     const tokenPayload = this.auth.decodedToken();
      //     this.userStore.setFullNameForStore(tokenPayload.name);
      //     this.userStore.setRoleForStore(tokenPayload.role);
      //     this.toast.success({detail:"SUCCESS", summary:res.message, duration: 5000});
      //     this.router.navigate(['dashboard'])
      //   },
      //   error: (err) => {
      //     this.toast.error({detail:"ERROR", summary:"Something when wrong!", duration: 5000});
      //     console.log(err);
      //   },
      // });
    } else {
      ValidateForm.validateAllFormFields(this.loginForm);
    }
  }
}
