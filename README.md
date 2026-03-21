# 🥗 CalorIA

Asistente nutricional personal con inteligencia artificial. Registrá tus comidas por foto, descripción o código de barras, y llevá el control de tus calorías y macronutrientes diarios.

## ✨ Funcionalidades

- **Análisis por foto** — sacá una foto del plato y la IA identifica los alimentos y calcula la nutrición automáticamente
- **Descripción libre** — describí lo que comiste en texto y la IA calcula los valores nutricionales
- **Código de barras** — escaneá productos envasados con la base de datos Open Food Facts
- **Objetivos personalizados** — cálculo de calorías y macros según tu perfil (edad, peso, estatura, actividad)
- **Seguimiento diario** — ring de calorías, barras de macros y lista de comidas del día
- **Historial y gráficos** — evolución de calorías y peso de los últimos 14 días
- **Avatar personalizado** — elegí un emoji o subí tu propia foto con recorte circular
- **Sincronización en la nube** — datos guardados en Supabase, accesibles desde cualquier dispositivo
- **Login con Google** — autenticación segura sin contraseñas
- **PWA instalable** — funciona como app nativa en iOS y Android sin pasar por las stores

## 🛠️ Tecnologías

| Capa | Tecnología |
|---|---|
| Frontend | HTML, CSS, JavaScript vanilla |
| IA | OpenRouter API (múltiples modelos gratuitos) |
| Base de datos | Supabase (PostgreSQL) |
| Autenticación | Supabase Auth + Google OAuth |
| Storage | Supabase Storage (avatares) |
| Productos | Open Food Facts API |
| Gráficos | Chart.js |
| Deploy | Vercel |

## 📁 Estructura del proyecto

```
caloria-app/
├── index.html          # App principal (single page)
├── manifest.json       # Configuración PWA
├── sw.js               # Service Worker
├── css/
│   └── styles.css      # Estilos completos
├── js/
│   ├── app.js          # Lógica principal de la app
│   ├── db.js           # Base de datos local (localStorage)
│   ├── supabase.js     # Cliente Supabase + helpers de auth y DB
│   ├── ai.js           # Conexión con OpenRouter
│   └── barcode.js      # Escáner de código de barras
└── icons/
    ├── icon-192.png
    └── icon-512.png
```

## 🚀 Instalación local

### Requisitos
- VS Code con extensión **Live Server**
- Cuenta en [OpenRouter](https://openrouter.ai) (gratis)
- Cuenta en [Supabase](https://supabase.com) (gratis)

### Pasos

1. Cloná el repositorio
```bash
git clone https://github.com/TU_USUARIO/caloria-app.git
cd caloria-app
```

2. Abrí la carpeta en VS Code

3. Hacé clic derecho en `index.html` → **Open with Live Server**

4. La app se abre en `http://127.0.0.1:5500`

## ⚙️ Configuración

### Supabase

1. Creá un proyecto en [supabase.com](https://supabase.com)
2. Ejecutá el script SQL de `/docs/schema.sql` en el SQL Editor
3. Activá el provider de Google en **Authentication → Providers**
4. Reemplazá las credenciales en `js/supabase.js`:

```javascript
const SUPABASE_URL  = 'https://TU_PROYECTO.supabase.co'
const SUPABASE_ANON = 'TU_ANON_KEY'
```

### OpenRouter

1. Creá una cuenta en [openrouter.ai](https://openrouter.ai)
2. Generá una API key en **Settings → API Keys**
3. Ingresala en la app desde **Menú → Configuración**

### Google OAuth

1. Creá un proyecto en [Google Cloud Console](https://console.cloud.google.com)
2. Configurá la pantalla de consentimiento OAuth
3. Creá credenciales OAuth con el redirect URI de Supabase:
```
https://TU_PROYECTO.supabase.co/auth/v1/callback
```
4. Pegá el Client ID y Secret en Supabase → Authentication → Providers → Google

## 🌐 Deploy en Vercel

1. Conectá el repositorio en [vercel.com](https://vercel.com)
2. Deploy sin configuración adicional (proyecto estático)
3. Agregá la URL de Vercel en Google Cloud Console → Authorized redirect URIs
4. Agregá la URL de Vercel en Supabase → Authentication → URL Configuration

## 📱 Instalar como app en el celular

**Android (Chrome):**
El navegador muestra automáticamente un banner para instalar → tocá **"Agregar a pantalla de inicio"**

**iOS (Safari):**
Tocá el botón compartir → **"Agregar a pantalla de inicio"**

## 🗄️ Esquema de base de datos

```sql
perfiles       — datos del usuario y objetivos
comidas        — registro de cada comida con macros
pesos          — historial de peso corporal
configuracion  — API key de OpenRouter y modelos seleccionados
```

Todas las tablas tienen Row Level Security (RLS) activado — cada usuario solo accede a sus propios datos.

## 📋 Roadmap

- [ ] App de gimnasio — registro de ejercicios, series y pesos
- [ ] Escáner de código de barras con cámara automática (requiere HTTPS)
- [ ] Notificaciones push para recordatorios
- [ ] Exportar datos a CSV
- [ ] Modo oscuro / claro

## 📄 Licencia

MIT — libre para uso personal y comercial.
