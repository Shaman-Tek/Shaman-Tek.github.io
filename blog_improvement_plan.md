# Plan de Mejoras para Shaman-Tek

Este plan detalla los pasos para solucionar los fallos críticos identificados en el reporte de TestSprite, enfocándose en Accesibilidad (WCAG 2.1 AA) y Rendimiento (FCP < 1.5s).

## Requiere Revisión del Usuario

> [!IMPORTANT]
> Algunos cambios en el sistema de diseño (como añadir bordes de foco) afectarán la estética visual del sitio durante la navegación con teclado.

## Cambios Propuestos

### 1. Accesibilidad (WCAG 2.1 AA)
El objetivo es asegurar que todos los elementos interactivos tengan indicadores de foco visibles.

#### [MODIFICAR] [globals.css](file:///c:/Users/lalop/Documents/Personal/blog/shamantek-completov1/shamantek/styles/globals.css)
- Eliminar `outline: none` de todos los elementos interactivos.
- Implementar estilos `:focus-visible` con alto contraste (usando los colores de acento de cada mundo).
- Asegurar que los elementos no semánticos (como las tarjetas bento) tengan `role="button"` y manejen las teclas `Enter` y `Espacio`.

---

### 2. Optimización de Rendimiento
Meta: Lograr un First Contentful Paint (FCP) menor a 1.5 segundos.

#### [MODIFICAR] [index.html](file:///c:/Users/lalop/Documents/Personal/blog/shamantek-completov1/shamantek/index.html)
- Añadir `<link rel="preload">` para la imagen del túnel hero y las fuentes críticas.
- Mover scripts no críticos al final del body con el atributo `defer`.
- Implementar un bloque pequeño de "CSS Crítico" en el `<head>` para renderizar la parte visible inicial de inmediato.

---

### 3. Integridad de Navegación
Corregir enlaces mal etiquetados.

#### [MODIFICAR] [index.html](file:///c:/Users/lalop/Documents/Personal/blog/shamantek-completov1/shamantek/index.html)
- Actualizar el enlace "ARCHIVO" para que apunte a la página correcta de artículos/archivo en lugar de `acerca.html`.

## Plan de Verificación

### Pruebas Automatizadas
- **Reejecutar TestSprite**: Correr la suite de pruebas (especialmente TC007, TC008, TC009) para verificar que los fallos se hayan resuelto.
- **Lighthouse**: Realizar una auditoría local de Lighthouse para confirmar las puntuaciones de FCP y Accesibilidad.

### Verificación Manual
- **Navegación con Teclado**: Tabular a través de la página de inicio y verificar que el foco sea visible en todos los elementos.
- **Movimiento Reducido**: Verificar que las animaciones respeten la configuración de "reducir movimiento" del sistema operativo.
