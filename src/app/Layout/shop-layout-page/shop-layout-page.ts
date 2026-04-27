import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Siderbar } from '../Components/siderbar/siderbar';
import { Navbar } from '../Components/navbar/navbar';

@Component({
  selector: 'app-shop-layout-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    Siderbar,
    Navbar
  ],
  templateUrl: './shop-layout-page.html',
  styleUrl: './shop-layout-page.css',
})
export class ShopLayoutPage {}
