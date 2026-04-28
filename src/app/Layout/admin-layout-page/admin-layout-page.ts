import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminSidebar } from '../Components/admin-sidebar/admin-sidebar';
import { AdminNavbar } from '../Components/admin-navbar/admin-navbar';

@Component({
  selector: 'app-admin-layout-page',
  imports: [
    CommonModule,
    RouterModule,
    AdminSidebar,
    AdminNavbar
  ],
  templateUrl: './admin-layout-page.html',
  styleUrl: './admin-layout-page.css',
})
export class AdminLayoutPage {}
