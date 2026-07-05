# Editar contenido del sitio

Lawyertec usa **Payload CMS** para editar los textos e imágenes de la página de inicio sin tocar código.

## Acceder al panel

1. Abre [lawyertec.com/admin](https://lawyertec.com/admin)
2. Inicia sesión con tu usuario de editor

En local: [http://127.0.0.1:3000/admin](http://127.0.0.1:3000/admin)

Al entrar verás una **tarjeta de bienvenida** con un enlace directo a la página de inicio.

## Qué puedes editar

En el menú lateral, entra a **Contenido → Página de inicio**. Verás pestañas en español con descripciones de ayuda bajo cada sección:

| Pestaña | Qué controla |
|---------|----------------|
| Navegación | Enlaces del menú superior |
| Hero | Título principal, cinta de fuentes legales y animación del chat |
| Secciones | Bloques de contenido en orden (funciones, estadísticas, carrusel, pasos, lista de espera) |
| SEO | Título y descripción para Google |

En **Secciones**, cada bloque es una sección del sitio. Puedes **añadir**, **eliminar** y **reordenar** bloques arrastrándolos. Cada fila muestra el tipo de sección y su título (p. ej. «Funciones: No es otro chat genérico»).

## Vista previa en vivo

1. Abre **Contenido → Página de inicio**
2. Haz clic en **Vista previa en vivo** (arriba a la derecha)
3. El sitio real aparece en un panel al lado — los cambios se ven al instante mientras editas
4. Puedes alternar entre vista **Escritorio** y **Móvil**

No necesitas guardar para ver la vista previa. Cuando estés satisfecho, haz clic en **Guardar** para publicar.

## Publicar cambios

1. Edita el contenido en cualquier pestaña
2. Haz clic en **Guardar**
3. El sitio se **reconstruye automáticamente** en Vercel (1–3 minutos)
4. Recarga [lawyertec.com](https://lawyertec.com) para ver los cambios en producción

> **Nota:** La vista previa en vivo es instantánea; el sitio público se actualiza tras el rebuild de Vercel.

## Imágenes del carrusel

En el bloque **Casos de uso** (pestaña Secciones), cada diapositiva tiene un campo **Imagen**:

1. Haz clic en el área de imagen
2. **Arrastra** una foto o elige **Subir** / **Seleccionar existente**
3. Escribe un **texto alternativo** (obligatorio) — describe la foto brevemente

Las imágenes se guardan en la biblioteca **Imágenes** del CMS.

## Ayuda

- **Olvidé mi contraseña:** contacta al administrador del proyecto
- **El sitio no se actualiza:** verifica que el deploy de Vercel terminó sin errores
- **La vista previa no carga:** recarga la página del admin e intenta de nuevo
- **Algo se ve roto:** avisa al equipo técnico con captura de pantalla

---

## Configuración técnica (equipo)

### Variables de entorno

**Obligatorias en producción (Vercel):**

```bash
DATABASE_URI=...
PAYLOAD_SECRET=...          # mín. 32 caracteres aleatorios; sin esto la app no arranca
NEXT_PUBLIC_SITE_URL=https://lawyertec.com
ALLOWED_ORIGINS=https://lawyertec.com,https://www.lawyertec.com
BLOB_READ_WRITE_TOKEN=...
SUPABASE_ANON_KEY=...
NEXT_PUBLIC_SUPABASE_URL=...
```

**Primer usuario admin (ejecutar antes o justo después del primer deploy):**

```bash
PAYLOAD_SEED_EMAIL=editor@lawyertec.com
PAYLOAD_SEED_PASSWORD=...
npm run seed
```

Mientras no exista ningún usuario, Payload expone `POST /api/users/first-register` — cualquiera podría crear el primer admin. El seed cierra esa ventana.

**Opcionales:**

```bash
VERCEL_DEPLOY_HOOK_URL=...  # Rebuild automático al guardar
# NEXT_PUBLIC_SERVER_URL=https://lawyertec.com  # Live Preview en previews de Vercel
```

### Primera vez

```bash
npm install
cp env.example .env
npx payload migrate
npm run seed
npm run dev
```

### Vercel Blob

1. Vercel → proyecto → **Storage → Create → Blob**
2. Conecta el store al proyecto
3. `BLOB_READ_WRITE_TOKEN` se añade automáticamente
4. Ejecuta `npm run seed` para subir las imágenes del carrusel

### Deploy hook

1. Vercel → **Settings → Git → Deploy Hooks** → crear hook para `main`
2. Añadir URL como `VERCEL_DEPLOY_HOOK_URL` en Production

### Build

```
payload generate:importmap → payload migrate → next build
```
