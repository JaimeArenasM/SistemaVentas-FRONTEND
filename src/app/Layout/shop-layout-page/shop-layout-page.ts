import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Navbar } from '../Components/navbar/navbar';
import { FooterComponent } from '../Components/footer/footer';

@Component({
  selector: 'app-shop-layout-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    Navbar,
    FooterComponent
  ],
  templateUrl: './shop-layout-page.html',
  styleUrls: ['./shop-layout-page.css']
})
export class ShopLayoutPage {}