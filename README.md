# GymTrack - Sistema de Gestión de Gimnasio

![GymTrack](https://img.shields.io/badge/GymTrack-v1.0.0-blue)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue)
![Vite](https://img.shields.io/badge/Vite-5.4.1-purple)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.11-teal)

## 📋 Descripción

GymTrack es un sistema integral de gestión para gimnasios desarrollado con React, TypeScript y TailwindCSS. Permite administrar miembros, planes de membresía, pagos y generar estadísticas en tiempo real.

## 👥 Equipo de Desarrollo

- **Brander Baez** - Frontend Developer
- **Juan Eliezer** - Backend Developer  
- **Daniel Ureña** - Base de Datos

## ✨ Características Principales

### 🏠 Dashboard
- Panel de control con estadísticas generales
- Visualización de métricas clave:
  - Total de miembros
  - Membresías activas
  - Membresías vencidas
  - Membresías suspendidas

### 👤 Gestión de Miembros
- Registro completo de miembros con información personal
- Datos de contacto y emergencia
- Asignación y gestión de planes de membresía
- Estados de membresía (activo, vencido, suspendido)
- Edición y eliminación de miembros

### 💳 Planes de Membresía
- **Mensual**: 1 mes - $30
- **Trimestral**: 3 meses - $80
- **Semestral**: 6 meses - $150
- **Anual**: 12 meses - $280

### 📊 Estadísticas
- Resumen visual de la gestión del gimnasio
- Métricas en tiempo real
- Cards informativas con iconografía

### 💰 Pagos (Próximamente)
- Control de pagos y facturación
- Historial de transacciones
- Gestión de vencimientos

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18.3.1** - Biblioteca de interfaz de usuario
- **TypeScript 5.5.3** - Tipado estático
- **Vite 5.4.1** - Herramienta de construcción
- **TailwindCSS 3.4.11** - Framework de CSS utilitario
- **React Router DOM 6.26.2** - Enrutamiento
- **React Hook Form 7.53.0** - Gestión de formularios
- **Zod 3.23.8** - Validación de esquemas

### UI Components
- **Radix UI** - Componentes accesibles y sin estilos
- **Shadcn/ui** - Sistema de componentes reutilizables
- **Lucide React** - Iconografía
- **Recharts** - Gráficos y visualizaciones

### Estado y Datos
- **TanStack React Query** - Gestión de estado del servidor
- **LocalStorage** - Persistencia local de datos
- **UUID** - Generación de identificadores únicos

## 📁 Estructura del Proyecto

```
gymtrack-member-hub/
├── public/
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── ui/              # Componentes UI reutilizables
│   │   ├── Dashboard.tsx    # Panel principal
│   │   ├── Layout.tsx       # Layout principal
│   │   ├── MemberForm.tsx   # Formulario de miembros
│   │   ├── EditMemberForm.tsx
│   │   ├── MembersList.tsx  # Lista de miembros
│   │   └── StatsCard.tsx    # Tarjetas de estadísticas
│   ├── hooks/
│   │   ├── useMembers.ts    # Hook para gestión de miembros
│   │   ├── useLocalStorage.ts
│   │   └── use-toast.ts
│   ├── lib/
│   │   └── utils.ts         # Utilidades
│   ├── pages/
│   │   ├── Index.tsx
│   │   ├── Members.tsx      # Página de miembros
│   │   ├── Payments.tsx     # Página de pagos
│   │   ├── Stats.tsx        # Página de estadísticas
│   │   └── NotFound.tsx
│   ├── types/
│   │   └── member.ts        # Tipos TypeScript
│   ├── App.tsx
│   └── main.tsx
├── components.json
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Pasos de instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/dalvinsegura/gymtrack.git
cd gymtrack-member-hub
```

2. **Instalar dependencias**
```bash
npm install
# o
yarn install
```

3. **Configurar variables de entorno** (si es necesario)
```bash
cp .env.example .env.local
```

4. **Ejecutar en modo desarrollo**
```bash
npm run dev
# o
yarn dev
```

5. **Construir para producción**
```bash
npm run build
# o
yarn build
```

## 📝 Scripts Disponibles

- `npm run dev` - Ejecuta la aplicación en modo desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run build:dev` - Construye en modo desarrollo
- `npm run lint` - Ejecuta el linter ESLint
- `npm run preview` - Previsualiza la build de producción

## 🎯 Funcionalidades Implementadas

### ✅ Completadas
- [x] Dashboard con estadísticas
- [x] Gestión completa de miembros (CRUD)
- [x] Sistema de planes de membresía
- [x] Validación de formularios
- [x] Interfaz responsive
- [x] Navegación con React Router
- [x] Persistencia en LocalStorage
- [x] Sistema de notificaciones (toast)

### 🔄 En Desarrollo
- [ ] Sistema de pagos completo
- [ ] Reportes avanzados
- [ ] Autenticación de usuarios
- [ ] Base de datos externa
- [ ] API REST

### 🔮 Próximas Características
- [ ] Dashboard de administrador
- [ ] Gestión de empleados
- [ ] Control de acceso con QR
- [ ] Notificaciones automáticas
- [ ] Backup automático
- [ ] Modo offline

## 🗃️ Modelos de Datos

### Member (Miembro)
```typescript
interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  emergencyContact: string;
  emergencyPhone: string;
  address: string;
  registrationDate: string;
  plan: Plan;
  status: MembershipStatus;
}
```

### Plan (Plan de Membresía)
```typescript
interface Plan {
  id: string;
  name: string;
  duration: number; // meses
  price: number;
  startDate: string;
  endDate: string;
}
```

### Estados de Membresía
```typescript
type MembershipStatus = 'active' | 'expired' | 'suspended';
```

## 🎨 Guía de Estilo

### Colores Principales
- **Amarillo**: `#eab308` - Elementos principales y destacados
- **Verde**: `#22c55e` - Estados activos y exitosos
- **Rojo**: `#ef4444` - Estados de error y vencidos
- **Gris**: `#6b7280` - Estados suspendidos y secundarios

### Tipografía
- Familia: Inter (sistema por defecto)
- Tamaños: Escala de TailwindCSS

## 🧪 Testing

```bash
# Ejecutar tests (cuando estén implementados)
npm run test

# Ejecutar tests en modo watch
npm run test:watch

# Coverage de tests
npm run test:coverage
```

## 📦 Deployment

### Vercel (Recomendado)
```bash
vercel --prod
```

### Netlify
```bash
npm run build
# Subir carpeta dist/
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🤝 Contribución

1. Fork del proyecto
2. Crear una rama para la característica (`git checkout -b feature/AmazingFeature`)
3. Commit de los cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

### Convenciones de Código
- Usar TypeScript para todo el código
- Seguir las reglas de ESLint configuradas
- Usar Prettier para formateo
- Escribir componentes funcionales con hooks
- Usar nombres descriptivos en inglés
- Comentarios importantes en español

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Contacto

- **Repositorio**: [https://github.com/dalvinsegura/gymtrack](https://github.com/dalvinsegura/gymtrack)
- **Issues**: [https://github.com/dalvinsegura/gymtrack/issues](https://github.com/dalvinsegura/gymtrack/issues)

## 🙏 Agradecimientos

- Shadcn/ui por el excelente sistema de componentes
- Radix UI por los primitivos accesibles
- Lucide por los iconos
- TailwindCSS por el framework de CSS

---

**GymTrack** - Simplificando la gestión de gimnasios 💪
