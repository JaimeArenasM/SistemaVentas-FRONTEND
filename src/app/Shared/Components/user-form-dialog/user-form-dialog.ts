import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { MatIcon, MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-user-form-dialog',
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
export class UserFormDialog {


    userForm: FormGroup;
    esEdicion: boolean= false;

    constructor(
      private fb: FormBuilder,
      public dialogRef: MatDialogRef<UserFormDialog>,

      @Inject(MAT_DIALOG_DATA) public data: any
    ){
      this.userForm=this.fb.group({

        iIdUsuario: [new Date().getTime()],
        vUsuario:['',[Validators.required, Validators.email]],
        password: ['123456'],
        nombres: ['',Validators.required],
        apellidos:['',Validators.required],
        dni:['',[Validators.required,Validators.minLength(8)]],
        telefono:['',[Validators.required,Validators.minLength(9)]],
        iIdTipoUsuario:[2,Validators.required]
      });
    }

    ngOnInit(): void {
      if (this.data) {
        this.esEdicion=true;

        this.userForm.patchValue(this.data);
      }
    }

    onCancel(): void{
      this.dialogRef.close(null);
    }

    onSave():void{
      if(this.userForm.valid){
        this.dialogRef.close(this.userForm.value);
      }else{
        this.userForm.markAllAsTouched() /**muestra errores si faltan campos */;
      }
    }
  }
