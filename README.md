<p align="center">
  <img src="/public/images/og-image.png" alt="Dar Farma" width="600" />
</p>

<h1 align="center">🌿 Dar Farma</h1>

<p align="center">
  <strong>Suplementos Naturales Premium — Elaborados en México</strong>
</p>

<p align="center">
  <a href="https://darfarma.com">🌐 Sitio Web</a>
</p>

---

## 📋 Descripción

**Dar Farma** es el sitio web oficial de una marca mexicana de suplementos naturales premium. La plataforma presenta el catálogo de productos, información de la marca, blog informativo y canales de contacto, todo con un diseño moderno y enfocado en la experiencia del usuario.

## ✨ Características

- 🏠 **Landing page** con hero animado, catálogo de productos destacados y secciones informativas
- 📝 **Blog** con artículos sobre salud, bienestar y suplementación
- 📞 **Contacto** con formulario y enlaces directos a redes sociales
- 📖 **Páginas legales** — Política de privacidad, política de reembolso y términos de servicio
- 🔍 **SEO avanzado** — Open Graph, Twitter Cards, JSON-LD, sitemap dinámico y robots.txt
- 📱 **PWA** — Manifiesto para instalación como app
- ⚡ **Rendimiento optimizado** — Lazy loading, compresión, imágenes en AVIF/WebP y carga diferida de secciones
- 🎨 **Animaciones fluidas** con Framer Motion

## 🛠️ Tech Stack

| Categoría       | Tecnología                     |
| --------------- | ------------------------------ |
| **Framework**   | Next.js 16 (App Router)       |
| **UI**          | React 19                       |
| **Lenguaje**    | TypeScript 5.7                 |
| **Estilos**     | Tailwind CSS 4                 |
| **Animaciones** | Framer Motion 12               |
| **Iconos**      | Lucide React                   |
| **Fuente**      | Montserrat (Google Fonts)      |

## 📁 Estructura del Proyecto

```
darfarma/
├── app/
│   ├── blog/                   # Blog y artículos individuales
│   ├── contacto/               # Página de contacto
│   ├── sobre-nosotros/         # Página "Sobre Nosotros"
│   ├── politica-privacidad/    # Política de privacidad
│   ├── politica-rembolso/      # Política de reembolso
│   ├── terminos-servicio/      # Términos de servicio
│   ├── globals.css             # Estilos globales
│   ├── layout.tsx              # Layout raíz con metadata SEO
│   ├── loading.tsx             # Estado de carga global
│   ├── not-found.tsx           # Página 404
│   ├── page.tsx                # Página principal (Home)
│   ├── manifest.ts             # Manifiesto PWA
│   ├── robots.ts               # Configuración de robots.txt
│   └── sitemap.ts              # Sitemap dinámico
├── components/
│   ├── header.tsx              # Barra de navegación
│   ├── footer.tsx              # Pie de página
│   ├── hero-section.tsx        # Hero principal animado
│   ├── featured-products.tsx   # Catálogo de productos destacados
│   ├── bento-grid.tsx          # Grid tipo Bento
│   ├── activations-section.tsx # Sección de activaciones
│   ├── about-us-section.tsx    # Sección "Sobre Nosotros"
│   ├── social-section.tsx      # Sección de redes sociales
│   ├── contact-section.tsx     # Sección de contacto
│   ├── blog-listing-section.tsx   # Listado de blog
│   ├── blog-article-section.tsx   # Artículo individual
│   ├── lazy-home-sections.tsx  # Carga diferida de secciones
│   ├── json-ld.tsx             # Datos estructurados (JSON-LD)
│   └── ...                     # Páginas legales
├── lib/
│   └── blog-data.ts            # Datos de artículos del blog
├── public/
│   ├── images/                 # Imágenes generales
│   └── products/               # Imágenes de productos
└── next.config.mjs             # Configuración de Next.js
```

## 🚀 Inicio Rápido

### Prerrequisitos

- [Node.js](https://nodejs.org/) v18 o superior
- npm (incluido con Node.js)

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/AldoRxz/Darfarma.git
cd Darfarma

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en **http://localhost:3000**

### Scripts Disponibles

| Comando          | Descripción                          |
| ---------------- | ------------------------------------ |
| `npm run dev`    | Inicia el servidor de desarrollo     |
| `npm run build`  | Genera el build de producción        |
| `npm run start`  | Sirve el build de producción         |
| `npm run lint`   | Ejecuta ESLint                       |

## 🌐 Despliegue

El proyecto está configurado para desplegarse en **Vercel**. Simplemente conecta el repositorio y Vercel detectará automáticamente la configuración de Next.js.

```bash
# Build de producción
npm run build
```

## 🧬 Productos

| Producto                      | Precio  |
| ----------------------------- | ------- |
| Citrato de Magnesio           | $349.00 |
| Colágeno Hidrolizado          | $399.00 |
| Omega 3                       | $289.00 |
| Creatina Monohidratada        | $329.00 |
| Colágeno + Glucosamina        | $449.00 |
| Magnesio Premium              | $379.00 |

## 📄 Licencia

Este proyecto es propiedad de **Dar Farma**. Todos los derechos reservados.

---

<p align="center">
  Hecho con 💚 en México
</p>
