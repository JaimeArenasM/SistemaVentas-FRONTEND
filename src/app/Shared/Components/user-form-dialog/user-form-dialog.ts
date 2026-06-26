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
    // Inicializamos el formulario con la estructura base de datos
    this.userForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      dni: ['', [Validators.required, Validators.maxLength(8)]],
      telefono: ['', Validators.maxLength(9)],
      direccion: [''],
      correo: ['', [Validators.required, Validators.email]],
      password: ['']
    });
  }

  ngOnInit() {
    // Si recibimos un idUsuario, significa que entramos en modo de modificación de datos
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

      // El correo electrónico actúa como clave única natural; se deshabilita para evitar inconsistencias
      this.userForm.get('correo')?.disable();

      // Removemos las reglas de validación obligatoria del password en modo edición
      this.userForm.get('password')?.clearValidators();
      this.userForm.get('password')?.updateValueAndValidity();
    } else {
      // Si el flujo es de creación, la clave vuelve a ser mandatoria para la encriptación
      this.userForm.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
      this.userForm.get('password')?.updateValueAndValidity();
    }
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }

  onSave(): void {
    if (this.userForm.valid) {
      // getRawValue() extrae tanto los controles activos como los deshabilitados (correo)
      this.dialogRef.close(this.userForm.getRawValue());
    }
  }
}
