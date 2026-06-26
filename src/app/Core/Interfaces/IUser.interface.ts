// Para cuando consultas el perfil del cliente (PerfilClienteResponse)
export interface ClienteProfile {
  nombres: string;
  apellidos: string;
  dni: string;
  telefono: string;
  direccion: string;
  correo: string;
}

// Para la lista de usuarios del Administrador (UsuarioResponse)
export interface UsuarioAdminView {
  idUsuario: number;
  correo: string;
  tipoUsuario: string; // Ej: "ADMIN", "CLIENTE"
  estado: string;
  nombreCliente: string;
}

export interface LoginRequest {
  // Soporte para tu login actual
  vUsuario?: string;
  vPassword?: string;
  correo?: string;
  password?: string;
}

export interface LoginResponse {
  token?: string;
  // Usamos 'any' en user para no romper la lógica de 'res.user.iIdTipoUsuario' que tienes en tu Login actual
  user?: any;
  tipoUsuario?: string;
  mensaje?: string;
  correo?: string;
}

export interface RegistroRequest {
  nombres: string;
  apellidos: string;
  dni: string;
  telefono: string;
  direccion: string;
  correo: string;
  password: string;
}
