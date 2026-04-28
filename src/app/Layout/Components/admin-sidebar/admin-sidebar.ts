import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../Core/Services/auth.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin-sidebar',
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule
  ],
  templateUrl: './admin-sidebar.html',
  styleUrl: './admin-sidebar.css',
})
export class AdminSidebar {

  private authService = inject(AuthService);

  logout(): void{
    this.authService.logout();
  }
}
