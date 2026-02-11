# Mini LMS Frontend

Un sistema de gestión de aprendizaje (Learning Management System) moderno y profesional construido con React, TypeScript y Material UI.

## 🚀 Inicio Rápido

### Requisitos Previos
- Node.js 18+
- npm o yarn
- Backend corriendo en `http://localhost:8080`

### Instalación

1. **Clonar o descargar el proyecto**
   ```bash
   cd mini-lms-frontend
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Iniciar servidor de desarrollo**
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en `http://localhost:5173`

4. **Compilar para producción**
   ```bash
   npm run build
   ```

5. **Ejecutar tests**
   ```bash
   npm test -- --run
   ```

---

## 📋 Endpoints CORE

### Autenticación
```
POST /auth/login
Body: { "username": "string", "password": "string" }
Response: { "token": "string" }
```

### Cursos
```
GET /courses
Response: Course[]

GET /courses/:id
Response: Course { id, title, description, instructor, durationHours }
```

### Inscripciones (Mi cuenta)
```
GET /me/enrollments
Response: Course[]
Auth: Bearer token (Required)

POST /me/enrollments/:courseId
Auth: Bearer token (Required)

DELETE /me/enrollments/:courseId
Auth: Bearer token (Required)
```

### Tareas
```
GET /me/tasks?courseId=:courseId
Response: UserTask[] { taskId, title, description, completed }
Auth: Bearer token (Required)

POST /me/tasks/:taskId/complete
Auth: Bearer token (Required)

DELETE /me/tasks/:taskId/complete
Auth: Bearer token (Required)
```

---

## 🛠 Stack Tecnológico

| Librería | Versión | Uso |
|----------|---------|-----|
| React | 19.2.0 | Framework principal |
| TypeScript | ~5.9.3 | Type safety |
| React Router | 7.13.0 | Enrutamiento |
| Material UI | 7.3.7 | Componentes UI |
| Axios | 1.13.5 | Cliente HTTP |
| Vite | 7.3.1 | Build tool |
| Vitest | latest | Testing |
| @testing-library/react | latest | Testing de componentes |

---

## 🏗 Arquitectura

### Estructura de Carpetas
```
src/
├── api/                 # Configuración de cliente HTTP
├── auth/                # Servicios de autenticación
├── components/          # Componentes reutilizables
│   ├── Navbar.tsx
│   ├── ProtectedRoute.tsx
│   └── __tests__/
├── context/             # Context API (AuthContext)
├── pages/               # Páginas principales
│   ├── LoginPage.tsx
│   ├── CoursesPage.tsx
│   ├── CourseDetailPage.tsx
│   └── MyCoursesPage.tsx
├── services/            # Servicios de API
├── types/               # Interfaces TypeScript
├── test/                # Configuración de testing
├── App.tsx              # Componente raíz
└── main.tsx             # Entry point
```

---

## 🔐 Decisiones Técnicas

### 1. **Context API para Autenticación**
- ✅ Simple y suficiente para este proyecto
- ✅ Evita dependencias adicionales (Redux, Zustand)
- ✅ Token almacenado en localStorage para persistencia
- ❌ No escalable para aplicaciones muy complejas

### 2. **Material UI (MUI) para Components**
- ✅ Profesional y moderno
- ✅ Temas personalizables
- ✅ Soporte para responsive design
- ✅ Excelente documentación
- ✅ Usado en empresas (mejor para entrevistas)

### 3. **Axios con Interceptores**
- ✅ Configuración centralizada de base URL
- ✅ Inyección automática de Bearer token
- ✅ Manejo consistente de errores
- ✅ Cancelación de requests

### 4. **ProtectedRoute Component**
- ✅ Redirige automáticamente a login si no hay token
- ✅ Validación del lado del cliente
- ✅ Previene acceso a rutas protegidas

### 5. **Manejo de Estados (Loading, Error, Empty)**
- ✅ UX profesional con spinners
- ✅ Mensajes de error claros
- ✅ Estados vacíos manejados
- ✅ Barra de progreso visual en tareas

### 6. **TypeScript Strict Mode**
- ✅ Type safety desde el inicio
- ✅ Mejor experiencia con IDE
- ✅ Menos bugs en producción
- ✅ Documentación inline

### 7. **Testing con Vitest + @testing-library**
- ✅ Testing unitario de componentes
- ✅ Pruebas más cercanas al comportamiento del usuario
- ✅ Integración con React

---

## 📊 Flujo de Autenticación

```
┌─────────────────┐
│   LoginPage     │
└────────┬────────┘
         │
         ├─→ login() → Backend
         │
         └─→ authLogin(token) → AuthContext
                │
                ├─→ localStorage.setItem("token")
                │
                └─→ setToken(token) ← Estado actualizado
                     │
                     └─→ navigate("/courses")
                          │
                          └─→ ProtectedRoute ✅ Permite acceso
```

---

## 🛡 Flujo de Rutas Protegidas

```
Route Request
     │
     └─→ ProtectedRoute
          │
          ├─→ ¿Token existe?
          │   │
          │   ├─ Sí → Render children ✅
          │   │
          │   └─ No → <Navigate to="/login" /> ❌
```

---

## 🧪 Testing

### Ejecutar tests en modo watch
```bash
npm test
```

### Ejecutar tests una sola vez
```bash
npm test -- --run
```

### Test de ProtectedRoute
```typescript
// src/components/__tests__/ProtectedRoute.test.tsx
- ✅ Redirige a login si no hay token
- ✅ Renderiza contenido si hay token
```

---

## 🎨 Supuestos del Proyecto

1. **Backend disponible en `http://localhost:8080`**
   - Cambiar en `src/api/axiosConfig.ts` si es necesario

2. **Token JWT en formato Bearer**
   - Esperado en header: `Authorization: Bearer <token>`
   - Almacenado en localStorage

3. **Usuarios y contraseñas válidos**
   - Proporcionados por el backend
   - Sin registro en esta versión

4. **Respuestas JSON estándar**
   ```json
   {
     "data": [...],
     "status": 200
   }
   ```

5. **Cors habilitado en backend**
   - Necesario para requests desde localhost:5173

---

## 🔄 Flujo de Usuario

### 1. **Login**
```
Usuario ingresa credenciales → Backend valida → Retorna token → 
Guardar en contexto → Redirigir a /courses
```

### 2. **Ver Catálogo de Cursos**
```
/courses → ProtectedRoute valida token → GET /courses → 
Mostrar cards con cursos → Opción de ver detalle
```

### 3. **Ver Detalle de Curso**
```
/courses/:id → GET /courses/:id → GET /me/tasks?courseId=:id →
Mostrar progreso + lista de tareas → Marcar como completadas
```

### 4. **Mis Cursos**
```
/my-courses → GET /me/enrollments → Mostrar cursos inscritos →
Opción de desinscribirse
```

### 5. **Logout**
```
Click en Logout → logout() → localStorage.removeItem("token") →
Contexto actualizado → Redirigir a /login
```

---

## 🚨 Manejo de Errores

| Escenario | Comportamiento |
|-----------|----------------|
| No hay token | Redirige a login |
| Token expirado | Error 401 → Redirige a login |
| API no disponible | Muestra Alert de error |
| Sin internet | Error de conexión |
| Credenciales inválidas | Alert: "Credenciales inválidas" |
| Curso no encontrado | Alert: "Curso no encontrado" |

---

## 📱 Características Implementadas

- ✅ **Autenticación con Context API**
- ✅ **Rutas protegidas con ProtectedRoute**
- ✅ **Material UI para componentes profesionales**
- ✅ **Manejo de estados (loading, error, empty, success)**
- ✅ **Barra de progreso visual en tareas**
- ✅ **Logout con limpieza de token**
- ✅ **Navbar responsive con Badge de contador**
- ✅ **TypeScript strict mode**
- ✅ **Tests unitarios**
- ✅ **Interceptores de Axios para Bearer token**

---

## 🎯 Próximas Mejoras (Roadmap)

- [ ] Refresh token automático
- [ ] Cache de datos con React Query
- [ ] Paginación en catálogo
- [ ] Búsqueda y filtros de cursos
- [ ] Descargar certificados
- [ ] Notificaciones en tiempo real
- [ ] Modo oscuro (Theme)
- [ ] Más tests (E2E con Cypress)
- [ ] PWA (Progressive Web App)

---

## 👨‍💻 Desarrollo

### Modo desarrollo con HMR (Hot Module Replacement)
```bash
npm run dev
```

### Linting
```bash
npm run lint
```

### Preview de build
```bash
npm run preview
```

---

## 📝 Variables de Entorno

Create `.env` if needed:
```
VITE_API_URL=http://localhost:8080
```

---

## 🐛 Troubleshooting

### Error: "Cannot GET /courses"
- Verificar que el backend está corriendo en `http://localhost:8080`

### Error: "token is not defined"
- Asegurarse que el login devuelve `response.token`

### Error CORS
- Habilitar CORS en backend con `Access-Control-Allow-Origin: http://localhost:5173`

### Ruta protegida redirige a login
- Verificar que hay token en localStorage
- Verificar que el token no está expirado

---

## 📞 Contacto / Soporte

Para problemas o sugerencias, contactar al equipo de desarrollo.

---

## 📄 Licencia

Este proyecto es privado y está destinado para propósitos educativos.

---

**Última actualización:** Febrero 2026  
**Versión:** 1.0.0
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
# mini-lms-frontend
