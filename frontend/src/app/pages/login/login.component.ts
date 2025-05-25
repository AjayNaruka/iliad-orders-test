import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  
} from '@angular/forms';
import { UserApiService } from '../../modules/shared/services/api/user/user-api.service';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from '../../modules/shared/services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true
})
export class LoginComponent {
  loginForm: FormGroup;
  title= "Ttile";
  constructor(
    formBuilder: FormBuilder,
    private userApiService: UserApiService,
    private authService: AuthServiceService,
    private router: Router
    ) {
    this.loginForm = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(){
    console.log("LOGIN API");
    console.log(this.loginForm.value);
    this.userApiService.login(this.loginForm.value)
      .subscribe(
        (response: any) => {
          console.log('token');
          console.log(response);
          this.authService.setToken(response.token);
          this.router.navigate(["/"]);
        }
      )
  }
}
