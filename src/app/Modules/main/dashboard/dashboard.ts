import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard { 
  // Variable para saber qué botón está activo
  activeSection: string = 'dashboard'; 

  // Función para cambiar la sección al hacer clic
  changeSection(section: string) {
    this.activeSection = section;
  }
}