# The Shortest URL - Servicio de Acortamiento de URLs

Este es un archivo README que proporciona información detallada sobre la implementación de **The Shortest URL**, un servicio de acortamiento de URLs desarrollado utilizando NestJs.

## Objetivo

El objetivo de este proyecto es implementar un servicio de acortamiento de URLs utilizando NestJs.

## Descripción

**shortlink** es un servicio de acortamiento de URLs en el que ingresas una URL como https://geekbears.com/defining-an-mvp-for-non-technical-founders/ (o cualquier otra URL) y devuelve una URL corta como http://gb.shrt/GeAi9Kz.

## Tareas

1. Implementar la asignación utilizando:

   - Lenguaje: TypeScript (TS)
   - Framework: NestJS

2. Se debe persistir todos los datos en una base de datos. En este caso se uso MongoDB

3. El contenido del esquema de la base de datos es a tu elección, pero trata de hacerlo lo más completo posible.

4. Endpoints requeridos:

   - **/api/v1/signup** - Registrar un nuevo usuario en la base de datos con correo electrónico y contraseña.
   - **/api/v1/login** - Iniciar sesión del usuario con correo electrónico y contraseña.
   - **/api/v1/encode** - Codificar una URL a una URL corta. Esta URL debe ser privada y solo accesible una vez que el usuario haya iniciado sesión.
   - **/api/v1decode** - Decodificar una URL corta a su URL original. Esta URL debe ser privada y solo accesible una vez que el usuario haya iniciado sesión.

   Ambos endpoints deben devolver respuestas en formato JSON.

5. Para la autenticación, se utilizo una estrategia de autenticación con Passport (local con JWT).

6. La URL puede ser codificada a una URL corta y la URL corta puede ser decodificada a la URL original. El código de la URL cortacumple con menos de 8 caracteres.

7. El codigo esta publicado en github.

8. Instrucciones detalladas sobre cómo ejecutar el proyecto en los siguientes pasos.

9. En este caso no se alcanzo a agregar tests a la aplicacion.

10. La documentacion de la aplicacion esta en Swagger.
```bash
http:localhost:<PORT>/api/v1
```

## Instrucciones de Ejecución

Para ejecutar el servicio de acortamiento de URLs, sigue estos pasos:

1. Clona este repositorio en tu máquina local:
```bash
git clone <URL_del_repositorio>
```

2. Navega al directorio del proyecto:
```bash
cd gb-challenge
```
3. Instala las dependencias:
```bash
yarn install
```

4. Configura tu base de datos MongoDB y actualiza la configuración en el archivo `.env`.

5. Ejecuta la aplicación:
```bash
yarn start:dev
```