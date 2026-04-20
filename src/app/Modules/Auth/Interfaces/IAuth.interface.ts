
//lo que el cliente envia
export interface IAuthenticationRequest{
vUsuario: string;
vPassword: string;
}
//LO QUE EL SERVIDOR DEVUELVE
export interface IAuthenticationResponse{
  user: IUser;
  token: string;
}
//el usuario detallado
export interface IUser{
  iIdUsuario: number;
  vUsuario: string;
  iIdTipoUsuario: number;
 //POR DEFINIRSE iIdTipoPersona: number;
  iIdPersona: number;
}
