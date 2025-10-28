# MediManager - Sistema de Gestión de Citas Médicas

Sistema completo de gestión de citas médicas que permite administrar pacientes, médicos y citas de manera eficiente y segura.

## 🚀 Características Principales

- **Gestión de Pacientes**: Registro completo con historial médico, información de contacto y datos personales
- **Gestión de Médicos**: Administración de profesionales médicos con especialidades y disponibilidad
- **Sistema de Citas**: Programación, edición y seguimiento de citas médicas con filtros avanzados
- **Dashboard Analítico**: Vista general con estadísticas en tiempo real
- **Autenticación Segura**: Sistema de login/registro con roles (Admin, Staff, User)
- **Control de Acceso**: Políticas RLS (Row Level Security) para protección de datos
- **Responsive Design**: Interfaz adaptable a todos los dispositivos

## 📋 Requisitos

- Node.js 18+ 
- npm o bun
- Cuenta en Lovable Cloud (backend incluido)

## 🛠️ Instalación

### Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd medimanager
```

### Instalar dependencias

```bash
npm install
# o
bun install
```

### Configurar variables de entorno

El archivo `.env` se genera automáticamente con Lovable Cloud. Contiene:

```env
VITE_SUPABASE_URL=<tu_url>
VITE_SUPABASE_PUBLISHABLE_KEY=<tu_key>
VITE_SUPABASE_PROJECT_ID=<tu_project_id>
```

### Ejecutar en desarrollo

```bash
npm run dev
# o
bun dev
```

La aplicación estará disponible en `http://localhost:5173`

## 👥 Usuarios y Roles

El sistema implementa tres niveles de acceso:

### Admin
- Email: `isaias.burga@gmail.com`
- Contraseña: `*Familia99`
- Permisos: Acceso completo, puede eliminar registros

### Staff
- Cualquier usuario registrado que no sea admin
- Permisos: Puede crear y editar pacientes, médicos y citas

### User
- Rol base para usuarios autenticados
- Permisos: Solo lectura

## 📚 Documentación Adicional

- [Manual de Usuario](./docs/USER_MANUAL.md) - Guía completa de uso de la aplicación
- [Documentación de Base de Datos](./docs/DATABASE.md) - Esquema y estructura de datos
- [Guía de Desarrollo](./docs/DEVELOPMENT.md) - Arquitectura y convenciones del código

## 🏗️ Tecnologías

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **UI Framework**: Tailwind CSS
- **Componentes**: shadcn/ui
- **Backend**: Lovable Cloud (Supabase)
- **Autenticación**: Supabase Auth
- **Base de Datos**: PostgreSQL
- **Validación**: Zod
- **Routing**: React Router v6
- **State Management**: React Query (TanStack Query)

## 📁 Estructura del Proyecto

```
medimanager/
├── src/
│   ├── components/        # Componentes reutilizables
│   │   ├── ui/           # Componentes shadcn/ui
│   │   ├── AuthGuard.tsx # Protección de rutas
│   │   └── Navigation.tsx# Navegación principal
│   ├── pages/            # Páginas de la aplicación
│   │   ├── Dashboard.tsx
│   │   ├── Auth.tsx
│   │   ├── Patients.tsx
│   │   ├── Doctors.tsx
│   │   └── Appointments.tsx
│   ├── integrations/     # Configuración de Supabase
│   ├── hooks/            # Custom hooks
│   ├── lib/              # Utilidades
│   └── index.css         # Estilos globales
├── supabase/
│   ├── migrations/       # Migraciones de BD
│   └── config.toml       # Configuración Supabase
└── docs/                 # Documentación
```

## 🔒 Seguridad

- **RLS Policies**: Todas las tablas tienen políticas de seguridad a nivel de fila
- **Validación de Datos**: Validación con Zod en cliente
- **Autenticación JWT**: Tokens seguros manejados por Supabase
- **HTTPS**: Comunicaciones encriptadas
- **Security Definer Functions**: Funciones seguras para verificación de roles

## 🚢 Despliegue

### Lovable (Recomendado)

1. Abre el proyecto en [Lovable](https://lovable.dev)
2. Click en Share → Publish
3. Tu app estará en línea automáticamente

### Vercel/Netlify

```bash
npm run build
# Despliega la carpeta dist/
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT.

## 👨‍💻 Autor

Desarrollado con ❤️ usando Lovable

## 🐛 Reporte de Bugs

Si encuentras algún bug, por favor abre un issue en el repositorio con:
- Descripción del problema
- Pasos para reproducirlo
- Comportamiento esperado vs actual
- Screenshots si aplica

## 📞 Soporte

Para soporte, contacta a través de:
- GitHub Issues
- Email del administrador

---

**Nota**: Este proyecto utiliza Lovable Cloud para el backend. No necesitas configurar Supabase manualmente.
