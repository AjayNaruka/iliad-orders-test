import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { UserApiService } from '../../modules/shared/services/api/user/user-api.service';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from '../../modules/shared/services/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string = '/';
  constructor(
    formBuilder: FormBuilder,
    private userApiService: UserApiService,
    private authService: AuthServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.returnUrl = params['returnUrl'] || '/';
    });
  }

  onSubmit() {   
    this.userApiService
      .login(this.loginForm.value)
      .subscribe((response: any) => {
        this.authService.setToken(response.token);
        this.router.navigate([this.returnUrl]);
      });
  }
}
