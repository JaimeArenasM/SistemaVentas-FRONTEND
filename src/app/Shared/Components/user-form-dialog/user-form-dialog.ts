import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  templateUrl: './user-form-dialog.html',
  styleUrl: './user-form-dialog.css',
})
export class UserFormDialog implements OnInit {

  userForm: FormGroup;
  esEdicion: boolean = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserFormDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // REGLAS ESTRICTAS DE VALIDACIÓN CON REGEX
    this.userForm = this.fb.group({
      // Nombres y apellidos: Solo letras, espacios y tildes/eñes
      nombres: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]],
      apellidos: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]],

      // DNI: Exactamente 8 números (del 0 al 9)
      dni: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],

      // Teléfono: Exactamente 9 números (opcional, pero si pone, deben ser 9)
      telefono: ['', [Validators.pattern(/^[0-9]{9}$/)]],

      direccion: [''],
      correo: ['', [Validators.required, Validators.email]],
      password: ['']
    });
  }

  ngOnInit() {
    if (this.data && this.data.idUsuario) {
      this.esEdicion = true;

      this.userForm.patchValue({
        nombres: this.data.nombreCliente ? this.data.nombreCliente.split(' ')[0] : '',
        apellidos: this.data.apellidos || '',
        dni: this.data.dni || '',
        telefono: this.data.telefono || '',
        direccion: this.data.direccion || '',
        correo: this.data.correo || ''
      });

      this.userForm.get('correo')?.disable();
      this.userForm.get('password')?.clearValidators();
      this.userForm.get('password')?.updateValueAndValidity();
    } else {
      this.userForm.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
      this.userForm.get('password')?.updateValueAndValidity();
    }
  }

  // --- BLOQUEADORES DE TECLADO ---

  // Evita que se escriban letras donde van números
  soloNumeros(event: KeyboardEvent) {
    const charCode = event.key.charCodeAt(0);
    // Si no es un número (códigos ASCII del 48 al 57), bloquea la tecla
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  // Evita que se escriban números donde van letras
  soloLetras(event: KeyboardEvent) {
    const regex = new RegExp("^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$");
    // Si la tecla presionada no es una letra, la bloquea
    if (!regex.test(event.key)) {
      event.preventDefault();
    }
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }

  onSave(): void {
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.getRawValue());
    }
  }
}
