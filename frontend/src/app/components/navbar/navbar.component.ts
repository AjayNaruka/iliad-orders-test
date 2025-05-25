import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthServiceService } from '../../modules/shared/services/auth-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  standalone: true,
})
export class NavbarComponent {
  constructor(public authService: AuthServiceService){}
}
