<div align="center">

# 🛒 Sistema de Ventas - Tienda de Don Pepe

Sistema Frontend Avanzado para la gestión de ventas de productos comestibles, separación de roles de usuario, simulación de pagos electrónicos y persistencia relacional en LocalStorage.

![Angular](https://img.shields.io/badge/Angular-17-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Angular Material](https://img.shields.io/badge/Angular_Material-1976D2?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)

---

### 👥 Equipo de Desarrollo

| Integrante | Rol Principal | Ramas Asignadas |
| :--- | :--- | :--- |
| *Isaac Livaque* | Autenticación, Arquitectura Core y Lógica Relacional, vistas Gestión de ventas y Gestión de Clientes | feature/login, feature-Componentes-de-admin,feature-gestion-ventas, feature-gestion-clientes, feature-rediseño-de-dashboard  |
| *César U.* | Gestión de Carrito, Checkout y Pagos | feature/carrito |
| *Casey R.* | Tienda, UI/UX, Tablas y Panel Admin | feature/cliente-tienda, feature/dashboard |
| *Sebastian * | Gestion Productos | feature/cliente-tienda, feature/dashboard |
| *Jaime * | Footer, Terminos y privacidad | feature-footer |

</div>

---

## 📖 Sobre el Proyecto

*Don Pepe* es una aplicación web SPA (Single Page Application) desarrollada en Angular que simula un e-commerce real. El sistema destaca por su manejo de estado y persistencia de datos mediante LocalStorage, simulando una base de datos relacional (Usuarios ↔️ Ventas ↔️ Productos) sin necesidad de un backend conectado. Cuenta con seguridad en rutas, separación estricta de responsabilidades (Cliente vs. Administrador) y sincronización de datos en tiempo real entre vistas.

---

## 🏗️ Arquitectura del Sistema (Roles)

El sistema cuenta con una gestión de roles implementada e inyectada en el Frontend, protegiendo las vistas y acciones según el tipo de sesión:

### 👤 Rol Cliente
* *Catálogo Sincronizado:* Visualización de productos en tiempo real (si el admin agrega un producto, el cliente lo ve al instante).
* *Filtrado Avanzado:* Búsqueda por coincidencia de texto y menú lateral de categorías (Cereales, Snacks, Limpieza, etc.).
* *Carrito Seguro:* Protegido por sesión. No se permiten carritos anónimos o "fantasmas" (el carrito se destruye al cerrar sesión).
* *Historial de Compras ("Mis Compras"):* Lectura relacional de tickets. El cliente solo visualiza los tickets asociados a su cuenta.
* *Checkout Inteligente:* Generación automática de tickets de venta con cálculo de totales y simulación de pasarelas (Yape/Plin con QR, Tarjetas).

### 🛡️ Rol Administrador
* *Gestión de Productos (CRUD):* Tabla interactiva con filtro compuesto (Buscador + Categoría). Creación, edición y eliminación de productos mediante modales de Angular Material.
* *Gestión de Ventas (CRM):* Panel de control para visualizar todos los tickets generados.
  * Capacidad de cambiar el estado a "Completado" o "Anulado".
  * Modal de *"Vista de Detalle"* para auditar qué productos exactos y en qué cantidades compró un cliente.
* *Navegación Dinámica:* Redirecciones inteligentes (ej. al cerrar sesión, el admin va al login, pero el cliente va al catálogo).

---

## 🎯 Funcionalidades Principales y Flujos

#### Autenticación y Seguridad
- [x] Login seguro con validación de formularios reactivos (ReactiveForms).
- [x] Redirección desde Login a Registro para usuarios nuevos.
- [x] Candados de seguridad: Bloqueo de adición al carrito si no hay sesión activa.
- [x] Destrucción de variables de sesión (carrito) en el Logout e inicio de sesión para evitar filtración de datos.

#### Cliente (Store)
- [x] Catálogo responsivo con tarjetas (MatCard).
- [x] Lógica de filtrado en tiempo real normalizando textos (ignorando tildes y mayúsculas).
- [x] Modal dinámico del carrito en el Header con cálculo de totales (S/).
- [x] Generación de Ticket de Venta guardado directamente en la "Base de Datos" (donPepe_ventas_db).

#### Administrador (Dashboard)
- [x] Tabla de Manifiesto de Ventas con actualización de estados y badges de colores.
- [x] Interfaz de Gestión de Productos compartiendo el mismo Storage Key (donPepe_products) que la tienda del cliente.
- [x] Integración de Modales reutilizables (ConfirmDialog, ProductFormDialog, DetalleVentaDialog).

---

## 🔐 Credenciales de Acceso (Demo)

El sistema valida mediante datos alojados en el servicio de autenticación o generados en el registro.

| Rol | Correo Electrónico | Contraseña | Redirección Post-Login |
| :--- | :--- | :--- | :--- |
| *Administrador* | admin@tienda.com | 123456 | /admin/dashboard |

---

## ⚙️ Tecnologías Utilizadas

* *Framework:* Angular 17 (Standalone Components + Inject pattern).
* *UI Kit:* Angular Material (Cards, Dialogs, Tables, Selects, Badges, Icons).
* *Programación Reactiva:* RxJS (Observables, Subscriptions para el estado del carrito).
* *Persistencia:* LocalStorage estructurado (donPepe_products, donPepe_ventas_db, sistema_ventas_data).
* *Estilos:* CSS puro con variables y utilidades Flexbox/Grid.

---

## 🌿 Flujo de Trabajo y Buenas Prácticas (Gitflow)

Se implementó una arquitectura limpia y un control de versiones colaborativo profesional:

* main: Rama de producción. Estrictamente estable.
* dev: Rama de integración para pruebas de conjunto.
* feature/*: Ramas atómicas por funcionalidad. El código no se fusiona hasta que la lógica (como la conexión entre catálogos y admin) esté probada.

---

## 📁 Arquitectura de Carpetas (Clean Architecture)

El proyecto fue estructurado bajo un enfoque modular y escalable, separando estrictamente la lógica de negocio, las vistas por dominio y los componentes compartidos:
```text
src/
└── app/
    ├── Core/                  # Lógica central del negocio (Singleton) y seguridad
    │   ├── Guards/            # Protección de rutas (auth-guard, role-guard)
    │   ├── Interfaces/        # Tipado estricto (ICarrito, IProduct, ISale, IUser)
    │   └── Services/          # Servicios inyectables (auth, carrito, product, storage)
    │
    ├── Layout/                # Estructuras base y plantillas de las páginas
    │   ├── admin-layout-page/ # Layout principal del panel administrativo
    │   ├── Components/        # Componentes UI de estructura (Navbars, Sidebars, Footers)
    │   └── shop-layout-page/  # Layout principal de la tienda para clientes
    │
    ├── Modules/               # Vistas agrupadas por dominio de negocio (Routing independiente)
    │   ├── Admin/             # Panel administrativo (Dashboard, Gestión Ventas/Productos/Clientes)
    │   ├── Auth/              # Módulo de Autenticación (Login, Registro)
    │   └── Store/             # Vistas del cliente (Catálogo, Carrito, Checkout, Mis Compras)
    │
    ├── Shared/                # Elementos reutilizables transversales a toda la app
    │   └── Components/        # Modales interactivos (Confirmaciones, Formularios CRUD)
    │
    ├── app.config.ts          # Configuración global de proveedores de Angular 17+
    ├── app.routes.ts          # Enrutador principal que orquesta los módulos
    └── app.html / app.css     # Componente raíz de la aplicación
