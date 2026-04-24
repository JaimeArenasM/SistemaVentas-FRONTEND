<div align="center">

# 🛒 Sistema de Ventas - Tienda de Don Pepe

*Sistema Frontend para la gestión de ventas de productos comestibles, separación de roles de usuario y simulación de pagos electrónicos.*

![Angular](https://img.shields.io/badge/Angular-17-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Angular Material](https://img.shields.io/badge/Angular_Material-1976D2?style=for-the-badge&logo=angular&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)

---

### 👥 Equipo de Desarrollo

| Integrante | Rol Principal | Ramas Asignadas |
| :--- | :--- | :--- |
| **Isaac L.** | Autenticación y Arquitectura Base | `feature/login` |
| **César U.** | Gestión de Carrito y Pagos | `feature/carrito` |
| **Casey R.** | Tienda, UI/UX y Panel Admin | `feature/cliente-tienda`, `feature/dashboard` |

</div>

---

## 📖 Sobre el Proyecto

**Don Pepe** es una aplicación web desarrollada en Angular que simula un e-commerce real. El sistema permite una separación estricta de responsabilidades según el rol del usuario (Cliente vs. Administrador), simulando persistencia de datos mediante *Local Storage* sin necesidad de un backend conectado.

---

## 🏗️ Arquitectura del Sistema (Roles)

El sistema cuenta con una gestión de roles implementada en el Frontend:

### 👤 Rol Cliente
* **Ingresar a la tienda:** Visualización de catálogo con imágenes reales.
* **Filtrado por Categorías:** Harinas, Cereales, Snacks, Bebidas, etc.
* **Carrito Reactivo:** Agregar productos, ver totales y cantidades en tiempo real.
* **Métodos de Pago Simulados:** Integración visual de Tarjeta de Crédito, Yape y Plin (con generación de código QR).

### 🛡️ Rol Administrador
* **Panel de Control (Dashboard):** Visualización de estadísticas de ventas, usuarios y pedidos.
* **Gestión de Pedidos:** Tabla interactiva con estados (Completado, En Camino, Cancelado).

---

## 🎯 Funcionalidades Principales

#### Cliente
- [x] Login y Logout seguro.
- [x] Catálogo de productos responsivo.
- [x] Barra lateral de categorías interactiva.
- [x] Carrito de compras persistente (no se pierde al recargar).
- [x] Modal de pagos con selección de método.
- [x] Generación automática de código QR para pagos móviles.

#### Administrador
- [x] Dashboard con tarjetas de estadísticas.
- [x] Tabla de manifiesto de pedidos en tiempo real.
- [x] Navegación lateral limpia y segura.

---

## 🔐 Credenciales de Acceso (Demo)

Dado que no hay backend, el sistema valida mediante datos quemados (*hardcoded*) en el servicio de autenticación.

| Rol | Correo Electrónico | Contraseña |
| :--- | :--- | :--- |
| **Administrador** | `admin@tienda.com` | `123456` |
| **Cliente** | `cliente@tienda.com` | `123456` |

> **Nota:** Al iniciar sesión como Admin, el acceso a la tienda está restringido. Al iniciar como Cliente, se accede directamente al catálogo.

---

## ⚙️ Tecnologías Utilizadas

* **Framework:** Angular 17 (Standalone Components).
* **UI Kit:** Angular Material (Tarjetas, Formularios, Iconos).
* **Estilos:** CSS Grid, Flexbox, Variables CSS.
* **Persistencia:** LocalStorage y SessionStorage (Simulación de Base de Datos).
* **Control de Versiones:** Git y GitHub.

---

## 🌿 Buenas Prácticas de Git Implementadas

Para mantener un orden estricto, se siguió el flujo de trabajo basado en *Feature Branching*:

* `main`: Rama estable. **No se sube código hasta que todo esté completamente integrado.**
* `dev`: Rama de integración. Solo se suben los *merge* cuando el código está probado en ramas aisladas.
* `feature/*`: Ramas individuales por funcionalidad (`feature/login`, `feature/carrito`, `feature/dashboard`). Cada integrante trabaja de forma aislada.

---

## 📁 Estructura del Proyecto

```text
src/
├── app/
│   ├── Modules/
│   │   ├── Auth/          # Módulo de Login y Registro
│   │   │   ├── pages/
│   │   │   └── Services/  # Servicio de autenticación simulada
│   │   └── main/
│   │       ├── dashboard/ # Panel de Administración
│   │       ├── tienda/    # Catálogo de productos y menú lateral
│   │       ├── models/    # Interfaces (Product, CartItem)
│   │       └── services/  # Lógica del carrito (CarritoService, ProductService)
├── assets/                # Imágenes estáticas 
└── public/                # Archivos públicos (Configuración del proyecto)
