import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Validation from '../utils/validation';
import ValidateForm from '../helpers/validationform';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  type: string = 'password';
  public registerForm!: FormGroup;

  constructor(private fb : FormBuilder,private auth: AuthService,
    private router: Router,) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      firstname:['', Validators.required],
      lastname:['', Validators.required],
      username:['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
      ],],
      email:['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password:['', [
        Validators.required,
        Validators.maxLength(20),
        Validators.required,
        Validators.pattern(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
        ),
        Validators.minLength(8),
      ],],
      passwordconfirm:['', Validators.required],
      phone:['', Validators.required],
      address:['', Validators.required],
      genderId:['', Validators.required]
    },
    {
      validators: [Validation.match('password', 'passwordconfirm')]
    })
  }
  
  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  onSubmit() {
    console.log('this.registerForm.value');
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      this.auth.signUp(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res.message);
          this.registerForm.reset();
          // this.auth.storeToken(res.token);
          // const tokenPayload = this.auth.decodedToken();
          // this.userStore.setFullNameForStore(tokenPayload.name);
          // this.userStore.setRoleForStore(tokenPayload.role);
          // this.toast.success({detail:"SUCCESS", summary:res.message, duration: 5000});
          this.router.navigate(['/login'])
        },
        error: (err) => {
          // this.toast.error({detail:"ERROR", summary:"Something when wrong!", duration: 5000});
          console.log(err);
        },
      });
    } else {
      ValidateForm.validateAllFormFields(this.registerForm);
    }
  }
}
