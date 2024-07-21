# CONDORSOFT

Este proyecto tiene como objetivo cubrir la prueba técnica de full stack ssr/sr.

## Tecnologías Utilizadas

- Gestión de paquetes: `pnpm`
- Frontend: `Next JS`, `Tailwind CSS`
- Backend: `Prisma`, `Postgres`

## Configuración

### Instalación de Dependencias

Para instalar el gestor de paquetes a utilizar en este proyecto:

```
https://pnpm.io/installation
```
Para instalar las dependencias del proyecto, ejecuta:

```
$ pnpm install
```

### Ejecutar la Aplicación en Modo Desarrollo

Para correr la aplicación en modo desarrollo, utiliza:

```
$ pnpm dev
```

### Configuración de Postgres

Para configurar Postgres, sigue las instrucciones en [Neon Tech](https://neon.tech/). La versión gratuita es suficiente para el despliegue del proyecto.


### Despliegue

Una vez finalizado el proyecto, debe ser desplegado, por facilidad recomendamos utilizar los servicios de [Vercel](https://vercel.com/).

## Estructura del Proyecto

### Modificación del Esquema Prisma

Deberás modificar el archivo `schema.prisma` para agregar tu propia definición de modelo basada en la problemática dada en este ejercicio.


### Libertad para Agregar Librerías

Puedes agregar cualquier librería extra para gestionar la funcionalidad de la aplicación, por ejemplo, `react-query` para gestionar solicitudes o `trpc`.


## PROBLEMA A RESOLVER

- La app inicia con una pantalla de inicio de sesión (cualquier método de autenticación es válido: usuario y contraseña, Gmail, Discord, etc.). Puedes usar librerías como next-auth, clerk o lucia para facilitar esto.

- Una vez inicies sesión, en base a los diseños crearás un calendario capaz de agendar recordatorios en el periodo de tiempo establecido. La precisión debe ser de días y horas. Por ejemplo, puedes asignar una cita para el día 1 de agosto a las 12:00. No es necesario que la precisión incluya minutos (aunque será considerado como un plus).

- Los recordatorios que crees se guardarán en una base de datos (recomendamos usar Neon por su plan gratuito), y se enviará un correo con el texto que has puesto en el recordatorio cuando este llegue a su fecha y hora establecida.

- **Punto adicional:**  Esta parte no es obligatoria, sin embargo, es un plus. Si estás usando la aplicación al mismo tiempo que se está cumpliendo el tiempo de envío del recordatorio, una notificación aparecerá (toast o modal) con el texto Enviando recordatorio ahora. Esto permitirá evaluar cómo resuelves el problema de tiempo real.


### Pistas

- Debido a la naturaleza del despliegue en serverless (Vercel), podrías encontrar algunas limitaciones al momento de definir cronjobs o websockets. Podrías utilizar servicios como `https://upstash.com/`(cron jobs) o `https://pusher.com/`(websockets) para solucionar este problema.

- En caso de que optaras por un despliegue en servidor, recomendamos convertir este proyecto en un monorepo y desplegar el servidor en servicios como Railway, o digital ocean.

### Diseño

El diseño se basa en los esquemas proporcionados en Figma. Puedes encontrar los diseños en este enlace: [Prueba - CondorSoft](https://www.figma.com/design/EZLhCjYcr4vDxSE3mpZVr6/Technical-Test?node-id=0-1&t=eMK8tASYXG55hbX9-0). 
**Nota Importante:** Este diseño es informativo para seguir los diseños y colores principales. No tiene que ser exacto al 100%, pero la idea debe ser similar.

