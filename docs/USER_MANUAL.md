# Manual de Usuario - MediManager

Guía completa para utilizar el sistema de gestión de citas médicas.

## 📖 Tabla de Contenidos

1. [Inicio de Sesión](#inicio-de-sesión)
2. [Dashboard](#dashboard)
3. [Gestión de Pacientes](#gestión-de-pacientes)
4. [Gestión de Médicos](#gestión-de-médicos)
5. [Gestión de Citas](#gestión-de-citas)
6. [Roles y Permisos](#roles-y-permisos)

---

## 🔐 Inicio de Sesión

### Acceso a la Aplicación

1. Visita la URL de la aplicación
2. Verás la pantalla de login/registro

### Crear una Cuenta Nueva

1. Click en "¿No tienes cuenta? Regístrate"
2. Completa el formulario:
   - **Nombre Completo**: Tu nombre completo
   - **Email**: Dirección de correo válida
   - **Contraseña**: Mínimo 6 caracteres
3. Click en "Crear Cuenta"
4. Tu cuenta será creada automáticamente con rol "Staff"

### Iniciar Sesión

1. Ingresa tu **Email**
2. Ingresa tu **Contraseña**
3. Click en "Iniciar Sesión"
4. Serás redirigido al Dashboard

### Cuenta de Administrador

- **Email**: isaias.burga@gmail.com
- **Contraseña**: *Familia99
- **Permisos**: Acceso completo al sistema

---

## 📊 Dashboard

El Dashboard es la pantalla principal que muestra un resumen general del sistema.

### Estadísticas Disponibles

1. **Total Pacientes**: Número total de pacientes registrados
2. **Total Médicos**: Número total de médicos en el sistema
3. **Total Citas**: Todas las citas programadas
4. **Citas Hoy**: Citas programadas para el día actual

### Navegación

Utiliza el menú superior para acceder a:
- Dashboard
- Pacientes
- Médicos
- Citas
- Cerrar Sesión

---

## 👥 Gestión de Pacientes

### Ver Lista de Pacientes

1. Click en "Pacientes" en el menú
2. Verás una tabla con todos los pacientes:
   - Nombre completo
   - Fecha de nacimiento
   - Teléfono
   - Email

### Crear Nuevo Paciente

1. Click en el botón "Nuevo Paciente"
2. Completa el formulario:
   - **Nombre Completo** * (requerido)
   - **Fecha de Nacimiento** * (requerido)
   - **Género** (opcional)
   - **Teléfono** * (requerido)
   - **Email** (opcional)
   - **Dirección** (opcional)
   - **Historial Médico** (opcional)
3. Click en "Crear"
4. El paciente aparecerá en la lista

### Editar Paciente

1. Localiza al paciente en la tabla
2. Click en el ícono de lápiz (Editar)
3. Modifica los campos necesarios
4. Click en "Actualizar"

### Eliminar Paciente

⚠️ **Nota**: Solo usuarios Admin pueden eliminar pacientes

1. Localiza al paciente en la tabla
2. Click en el ícono de basura (Eliminar)
3. Confirma la eliminación
4. El paciente será eliminado permanentemente

### Validaciones

- El email debe ser válido
- El teléfono debe tener máximo 20 caracteres
- El historial médico tiene límite de 1000 caracteres

---

## 👨‍⚕️ Gestión de Médicos

### Ver Lista de Médicos

1. Click en "Médicos" en el menú
2. Verás una tabla con:
   - Nombre completo
   - Especialización
   - Teléfono
   - Email

### Crear Nuevo Médico

1. Click en "Nuevo Médico"
2. Completa todos los campos (todos son requeridos):
   - **Nombre Completo**
   - **Especialización** (ej: Cardiología, Pediatría)
   - **Teléfono**
   - **Email**
   - **Número de Licencia**
3. Click en "Crear"

### Editar Médico

1. Localiza al médico en la tabla
2. Click en el ícono de lápiz (Editar)
3. Modifica los campos necesarios
4. Click en "Actualizar"

### Eliminar Médico

⚠️ **Nota**: Solo usuarios Admin pueden eliminar médicos

1. Click en el ícono de basura junto al médico
2. Confirma la eliminación

### Días Disponibles

Por defecto, los médicos están disponibles:
- Lunes a Viernes
- Puedes gestionar esto desde la base de datos

---

## 📅 Gestión de Citas

### Ver Citas

La página de Citas muestra:
- Paciente asignado
- Médico asignado
- Fecha y hora
- Estado de la cita
- Especialización del médico

### Filtrar Citas

Utiliza los filtros disponibles:

1. **Por Fecha**:
   - Selecciona una fecha específica
   - Solo verás citas de ese día

2. **Por Médico**:
   - Selecciona un médico del dropdown
   - Solo verás citas de ese médico

3. **Limpiar Filtros**:
   - Click en "Limpiar" para resetear

### Crear Nueva Cita

1. Click en "Nueva Cita"
2. Completa el formulario:
   - **Paciente** * (selecciona de la lista)
   - **Médico** * (selecciona de la lista)
   - **Fecha** * (selecciona del calendario)
   - **Hora** * (formato 24 horas)
   - **Estado** (Programada por defecto)
   - **Notas** (opcional, máx 500 caracteres)
3. Click en "Crear"

### Estados de Citas

Las citas pueden tener tres estados:

1. **Programada** (azul)
   - Cita pendiente de realizar
   - Estado predeterminado

2. **Completada** (verde)
   - Cita ya realizada
   - Cambia manualmente después de la consulta

3. **Cancelada** (rojo)
   - Cita cancelada por cualquier motivo
   - No se elimina del registro

### Editar Cita

1. Click en el ícono de lápiz en la cita
2. Modifica los campos necesarios
3. Puedes cambiar el estado aquí
4. Click en "Actualizar"

### Eliminar Cita

⚠️ **Nota**: Solo usuarios Staff y Admin pueden eliminar citas

1. Click en el ícono de basura
2. Confirma la eliminación
3. La cita será eliminada permanentemente

### Recomendaciones

- ✅ Marca citas como "Completada" después de cada consulta
- ✅ Usa "Cancelada" en lugar de eliminar para mantener historial
- ✅ Agrega notas importantes para referencia futura
- ✅ Revisa el Dashboard para ver citas del día

---

## 🔑 Roles y Permisos

### Admin

**Usuario**: isaias.burga@gmail.com

**Permisos**:
- ✅ Ver pacientes, médicos y citas
- ✅ Crear pacientes, médicos y citas
- ✅ Editar pacientes, médicos y citas
- ✅ **Eliminar** pacientes y médicos
- ✅ Eliminar citas

### Staff

**Usuarios**: Cualquier cuenta registrada (excepto admin)

**Permisos**:
- ✅ Ver pacientes, médicos y citas
- ✅ Crear pacientes, médicos y citas
- ✅ Editar pacientes, médicos y citas
- ✅ Eliminar citas
- ❌ NO puede eliminar pacientes
- ❌ NO puede eliminar médicos

### User

**Usuarios**: Rol base (actualmente no asignado automáticamente)

**Permisos**:
- ✅ Ver pacientes, médicos y citas
- ❌ NO puede crear
- ❌ NO puede editar
- ❌ NO puede eliminar

---

## ❓ Preguntas Frecuentes

### ¿Cómo recupero mi contraseña?

Actualmente la aplicación no tiene recuperación de contraseña. Contacta al administrador.

### ¿Puedo tener múltiples citas a la misma hora?

Sí, el sistema no valida conflictos de horario. Verifica manualmente antes de crear.

### ¿Los cambios se guardan automáticamente?

No, debes hacer click en "Crear" o "Actualizar" para guardar cambios.

### ¿Puedo exportar los datos?

Actualmente no hay función de exportación. Contacta al administrador para obtener reportes.

### ¿Qué navegadores son compatibles?

La aplicación funciona en:
- Chrome (recomendado)
- Firefox
- Safari
- Edge

### ¿Es responsive?

Sí, la aplicación funciona en dispositivos móviles, tablets y computadoras.

---

## 🐛 Resolución de Problemas

### No puedo iniciar sesión

1. Verifica que el email esté correctamente escrito
2. Verifica que la contraseña tenga mínimo 6 caracteres
3. Limpia el caché del navegador
4. Intenta en modo incógnito

### No veo los botones de eliminar

Solo los usuarios Admin pueden eliminar pacientes y médicos. Verifica tu rol.

### Los datos no se actualizan

1. Refresca la página (F5)
2. Verifica tu conexión a internet
3. Cierra sesión y vuelve a entrar

### Error al crear registro

1. Verifica que todos los campos requeridos (*) estén completos
2. Verifica que el formato de email sea válido
3. Verifica las longitudes máximas de caracteres

---

## 📞 Soporte

Si tienes problemas no cubiertos en este manual:

1. Contacta al administrador del sistema
2. Reporta bugs en el repositorio de GitHub
3. Consulta la documentación técnica

---

**Última actualización**: 2025

**Versión**: 1.0.0
