
# Bibliotech

Bibliotech es una biblioteca virtual desarrollada con NodeJS, Express y MySQL. Este proyecto incluye una página web interactiva y una API REST que se comunican entre sí para brindar una experiencia fluida a los usuarios. La página web permite a los usuarios explorar y buscar libros, mientras que la API REST proporciona los servicios necesarios para la administración y el acceso a los datos.


## Fotos

![App Screenshot](https://i.imgur.com/x6ayDQ9.png)


## Instalación

### Requisitos
> Node v20 o superior

> Base de datos MySQL 

### Pasos a seguir
1. Clona el repositorio
```console
git clone https://github.com/Exaedro/bibliotech/
```

2. Instala desde la terminal las dependencias con **npm**
```console
npm i
```

3. Crea una base de datos MySQL llamada `bibliotech_v2` e importa el archivo `bibliotech_v2.sql` que esta en la carpeta `sql`, la configuración por defecto para conectarse a la base de datos esta en el archivo `.env` que se encuentra en la raíz del proyecto.
```env
# Configuración para XAMPP
DB_HOST = localhost
DB_USER = root
DB_PASSWORD =
DB_DATABASE = bibliotech_v2
DB_PORT = 3306
```

4. Inicia la aplicación
> Primera opción
```console
npm run app
```
> Segunda opción (entrar desde el navegador al localhost:4000)
```console
npm run dev
```

5. Inicia sesión con una cuenta de administrador
- Entra en la pagina web
- Clickea en "iniciar sesión" en el menu de arriba a la derecha
- Ingresa los siguientes datos:
  - Correo: **oww@gmail.com**
  - Contraseña: **123**

## Desarrolladores

- [@Exaedro](https://www.github.com/Exaedro)
- [@Lesshugaa](https://github.com/Lesshugaa)
- [@Kani204](https://github.com/kani204)

