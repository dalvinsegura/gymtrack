# 🚀 Guía de Instalación y Configuración - GymTrack

## 📋 Requisitos del Sistema

### Requisitos Mínimos
- **Sistema Operativo**: Windows 10/11, macOS 10.15+, Linux Ubuntu 18.04+
- **Node.js**: Versión 16.14.0 o superior
- **RAM**: 4GB mínimo (8GB recomendado)
- **Espacio en disco**: 1GB para dependencias
- **Navegador**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

### Herramientas Necesarias
- **Git**: Para control de versiones
- **Editor de código**: VS Code (recomendado), WebStorm, o similar
- **Terminal**: Bash, Zsh, PowerShell, o Command Prompt

## 🔧 Instalación Paso a Paso

### 1. Verificar Instalaciones Previas

```bash
# Verificar Node.js
node --version
# Debe mostrar v16.14.0 o superior

# Verificar npm
npm --version
# Debe mostrar v8.0.0 o superior

# Verificar Git
git --version
# Debe mostrar cualquier versión reciente
```

### 2. Clonar el Repositorio

```bash
# Opción 1: HTTPS
git clone https://github.com/dalvinsegura/gymtrack.git

# Opción 2: SSH (si tienes configuradas las llaves SSH)
git clone git@github.com:dalvinsegura/gymtrack.git

# Navegar al directorio
cd gymtrack-member-hub
```

### 3. Instalar Dependencias

```bash
# Usando npm (recomendado)
npm install

# O usando yarn (alternativa)
yarn install

# O usando pnpm (alternativa rápida)
pnpm install
```

### 4. Verificar la Instalación

```bash
# Ejecutar en modo desarrollo
npm run dev

# La aplicación debería estar disponible en:
# http://localhost:5173
```

## ⚙️ Configuración del Entorno

### Variables de Entorno (Futuro)
Crear archivo `.env.local` en la raíz del proyecto:

```bash
# Configuración para desarrollo
VITE_APP_TITLE=GymTrack
VITE_APP_VERSION=1.0.0
VITE_API_URL=http://localhost:3001/api
VITE_ENABLE_MOCK_DATA=true

# Configuración para producción
VITE_API_URL=https://api.gymtrack.com
VITE_ENABLE_MOCK_DATA=false
```

### Configuración de VS Code

#### Extensiones Recomendadas
Instalar las siguientes extensiones para una mejor experiencia de desarrollo:

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-json",
    "usernamehw.errorlens",
    "streetsidesoftware.code-spell-checker"
  ]
}
```

#### Configuración de Workspace
Crear `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

## 🏃‍♂️ Comandos de Desarrollo

### Comandos Principales

```bash
# Iniciar servidor de desarrollo
npm run dev
# Puerto: http://localhost:5173

# Construir para producción
npm run build
# Genera carpeta dist/

# Previsualizar build de producción
npm run preview
# Puerto: http://localhost:4173

# Ejecutar linter
npm run lint

# Corregir errores de linting automáticamente
npm run lint:fix

# Verificar tipos TypeScript
npm run type-check
```

### Comandos Adicionales (Opcionales)

```bash
# Analizar tamaño del bundle
npm install -g webpack-bundle-analyzer
npm run build
npx webpack-bundle-analyzer dist/

# Limpiar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install

# Actualizar dependencias
npm update
```

## 🔍 Solución de Problemas Comunes

### Error: "Module not found"
```bash
# Solución 1: Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install

# Solución 2: Limpiar caché de npm
npm cache clean --force
npm install
```

### Error: "Port 5173 is already in use"
```bash
# Opción 1: Usar otro puerto
npm run dev -- --port 3000

# Opción 2: Matar el proceso que usa el puerto
# En Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# En macOS/Linux:
lsof -ti:5173 | xargs kill
```

### Error: "Cannot resolve dependency"
```bash
# Verificar versiones de Node.js y npm
node --version
npm --version

# Actualizar npm
npm install -g npm@latest

# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

### Error de permisos en npm (macOS/Linux)
```bash
# Cambiar directorio global de npm
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'

# Agregar a .bashrc o .zshrc
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

## 🌐 Configuración para Diferentes Entornos

### Desarrollo Local
```bash
# Variables de entorno para desarrollo
export NODE_ENV=development
export VITE_API_URL=http://localhost:3001/api
export VITE_ENABLE_MOCK_DATA=true

npm run dev
```

### Staging
```bash
# Build para staging
npm run build:dev

# Servir archivos estáticos
npm install -g serve
serve -s dist -p 3000
```

### Producción
```bash
# Build optimizado para producción
npm run build

# Variables de entorno para producción
export NODE_ENV=production
export VITE_API_URL=https://api.gymtrack.com
export VITE_ENABLE_MOCK_DATA=false
```

## 📱 Configuración Móvil/Responsive

### Testing en Dispositivos Móviles

1. **Obtener IP local**
```bash
# En Windows
ipconfig

# En macOS/Linux
ifconfig | grep inet
```

2. **Acceder desde dispositivo móvil**
```
http://[TU-IP-LOCAL]:5173
# Ejemplo: http://192.168.1.100:5173
```

3. **Usar túneles para testing externo**
```bash
# Instalar ngrok
npm install -g ngrok

# Crear túnel
ngrok http 5173
```

## 🔐 Configuración de Seguridad

### Variables Sensibles
```bash
# NUNCA incluir en el código fuente:
# - API keys
# - Tokens de autenticación
# - Contraseñas
# - URLs de bases de datos

# Usar siempre variables de entorno:
VITE_PUBLIC_API_KEY=pk_test_...
VITE_STRIPE_PUBLIC_KEY=pk_live_...
```

### Configuración de CORS (Futuro Backend)
```javascript
// cors.config.js
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://gymtrack.vercel.app'
  ],
  credentials: true
};
```

## 📦 Preparación para Deploy

### Vercel (Recomendado)
```bash
# Instalar Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy a producción
vercel --prod
```

### Netlify
```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Build y deploy
npm run build
netlify deploy --prod --dir=dist
```

### Docker (Opcional)
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "preview"]
```

```bash
# Construir imagen
docker build -t gymtrack .

# Ejecutar contenedor
docker run -p 3000:3000 gymtrack
```

## ✅ Checklist de Configuración

### Instalación Inicial
- [ ] Node.js instalado (v16.14.0+)
- [ ] Git instalado y configurado
- [ ] Repositorio clonado
- [ ] Dependencias instaladas
- [ ] Aplicación ejecutándose en localhost

### Configuración del Editor
- [ ] VS Code instalado
- [ ] Extensiones recomendadas instaladas
- [ ] Configuración de workspace aplicada
- [ ] Prettier y ESLint funcionando

### Testing y Validación
- [ ] Aplicación carga sin errores
- [ ] Navegación funciona correctamente
- [ ] Formularios responden apropiadamente
- [ ] Responsive design verificado
- [ ] Console sin errores críticos

### Preparación para Desarrollo
- [ ] Variables de entorno configuradas
- [ ] Git configurado para commits
- [ ] Scripts de npm funcionando
- [ ] Hot reload activado

## 📞 Soporte

Si encuentras problemas durante la instalación:

1. **Revisar esta guía** para soluciones comunes
2. **Verificar versiones** de Node.js y npm
3. **Consultar logs** en la terminal para errores específicos
4. **Crear un issue** en el repositorio con detalles del problema

---

¡Felicitaciones! 🎉 Tu entorno de desarrollo para GymTrack está listo.
