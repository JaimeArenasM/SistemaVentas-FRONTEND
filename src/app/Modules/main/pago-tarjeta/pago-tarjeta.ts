import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-pago-tarjeta',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './pago-tarjeta.html',
  styleUrls: ['./pago-tarjeta.css']
})
export class PagoTarjetaComponent {

  @Output() pagoExitoso = new EventEmitter<void>();

  pagoForm: FormGroup;
  submitted = false;

  private fb = inject(FormBuilder);

  constructor() {
    this.pagoForm = this.fb.group({
      numeroTarjeta: ['', [
        Validators.required,
        Validators.pattern(/^\d{16}$/),
        Validators.minLength(16),
        Validators.maxLength(16)
      ]],
      nombreTitular: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      fechaExpiracion: ['', [
        Validators.required,
        this.validarFechaExpiracion
      ]],
      cvv: ['', [
        Validators.required,
        Validators.pattern(/^\d{3,4}$/),
        Validators.minLength(3),
        Validators.maxLength(4)
      ]]
    });
  }

  // Validador personalizado para fecha de expiración
  validarFechaExpiracion(control: any) {
    if (!control.value) {
      return null;
    }

    const valor = control.value;
    // Formato MM/AA
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    
    if (!regex.test(valor)) {
      return { formatoInvalido: true };
    }

    const [mes, anio] = valor.split('/').map(Number);
    const fechaActual = new Date();
    const anioActual = fechaActual.getFullYear() % 100;
    const mesActual = fechaActual.getMonth() + 1;

    // Verificar si la tarjeta está vencida
    if (anio < anioActual || (anio === anioActual && mes < mesActual)) {
      return { tarjetaVencida: true };
    }

    return null;
  }

  // Getters para acceder a los campos del formulario
  get f() {
    return this.pagoForm.controls;
  }

  // Verificar si un campo tiene error
  tieneError(campo: string): boolean {
    const control = this.pagoForm.get(campo);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

  // Obtener mensaje de error
  obtenerMensajeError(campo: string): string {
    const control = this.pagoForm.get(campo);
    if (!control || !control.errors) return '';

    if (control.errors['required']) {
      return 'Este campo es requerido';
    }
    if (control.errors['pattern']) {
      if (campo === 'numeroTarjeta') {
        return 'Debe contener solo números (16 dígitos)';
      }
      if (campo === 'cvv') {
        return 'Debe contener 3 o 4 dígitos';
      }
    }
    if (control.errors['minlength']) {
      return `Mínimo ${control.errors['minlength'].requiredLength} caracteres`;
    }
    if (control.errors['maxlength']) {
      return `Máximo ${control.errors['maxlength'].requiredLength} caracteres`;
    }
    if (control.errors['formatoInvalido']) {
      return 'Formato inválido. Use MM/AA';
    }
    if (control.errors['tarjetaVencida']) {
      return 'La tarjeta está vencida';
    }

    return 'Campo inválido';
  }

  formatearNumeroTarjeta(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); // Solo números
    if (value.length > 16) {
      value = value.substring(0, 16);
    }
    input.value = value;
    this.pagoForm.get('numeroTarjeta')?.setValue(value);
  }

  formatearFecha(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    
    input.value = value;
    this.pagoForm.get('fechaExpiracion')?.setValue(value);
  }

  formatearCVV(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    if (value.length > 4) {
      value = value.substring(0, 4);
    }
    input.value = value;
    this.pagoForm.get('cvv')?.setValue(value);
  }

  confirmarPago(): void {
    this.submitted = true;

    if (this.pagoForm.invalid) {
      return;
    }

    // Simular procesamiento del pago
    this.pagoExitoso.emit();
  }
}