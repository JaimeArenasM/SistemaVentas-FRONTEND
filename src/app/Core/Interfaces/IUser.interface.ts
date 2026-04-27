// src/app/Core/Interfaces/IAuth.interface.ts

export interface IAuthenticationRequest {
  vUsuario: string;
  vPassword: string;
}

export interface IAuthenticationResponse {
  user: IUser;
  token: string;
}

export interface IUser {
  iIdUsuario: number;
  vUsuario: string; // Este es el correo
  password?: string; // Lo ponemos opcional para simular el LocalStorage
  iIdTipoUsuario: number; // 1 = Admin, 2 = Cliente
  iIdPersona: number;

  nombres?: string;
  apellidos?: string;
  telefono?: string;
 dni?:string;
}
