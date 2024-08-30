
# Bibliotech

Bibliotech es una biblioteca virtual desarrollada con NodeJS, Express y MySQL. Este proyecto incluye una página web interactiva y una API REST que se comunican entre sí para brindar una experiencia fluida a los usuarios. La página web permite a los usuarios explorar y buscar libros, mientras que la API REST proporciona los servicios necesarios para la administración y el acceso a los datos.


## Screenshots

![App Screenshot](https://i.imgur.com/x6ayDQ9.png)


## Instalación

Clona el repositorio
```bash
git clone https://github.com/Exaedro/bibliotech/
```

Instala las dependencias con **npm**

```bash
npm i
```

Inicia la aplicación utilizando

```bash
npm run dev
```
    
## Referencia de la API

### Libros

#### Obtener todos los libros

```http
  GET /api/v1/book/all
```

#### Obtener libro con ID

```http
  GET /api/v1/book/${id}
```

| Parametro | Tipo     | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Requerido**. ID del libro a buscar |

#### Obtener libros buscando por parametros

```http
  GET /api/v1/book/search
```

| Parametro | Tipo     | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | Titulo del libro |
| `genre`      | `string` | ID del genero |
| `author`      | `string` | Nombre del autor |
| `date`      | `int` | Año de publicación |
| `isbn`      | `string` | ISBN del libro |
| `pages`      | `int` | Cantidad de paginas |
| `language`      | `string` | Idioma |
| `publisher`      | `string` | Editorial |

#### Crear libro

```http
  POST /api/v1/book/create
```

| Parametro | Tipo     | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | **Requerido**. Titulo del libro |
| `author`      | `string` | **Requerido**. Nombre del autor |
| `isbn`      | `string` | **Requerido**. ISBN del libro |
| `date`      | `date` | **Requerido**. Fecha de publicación |
| `pages`      | `int` | **Requerido**. Cantidad de paginas |
| `language`      | `string` | **Requerido**. Idioma del libro |
| `publisher`      | `string` | **Requerido**. Editorial |
| `synopsis`      | `string` | **Requerido**. Sinopsis |
| `image`      | `string` | **Requerido**. Link de la portada |
| `pdfLink`      | `string` | **Requerido**. Link del pdf del libro |
| `state`      | `string` | **Requerido**. Estado del libro |
| `categories`      | `array` | **Requerido**. Generos que tiene el libro |

#### Obtener los libros mas recientes

```http
  GET /api/v1/book/recent
```
| Parametro | Tipo     | Descripción                       | Por defecto |
| :-------- | :------- | :-------------------------------- | :----------------- |
| `limit`      | `int` | **Opcional**. Cantidad de libros que quieres obtener | 8 |

#### Obtener los libros mas gustados

```http
  GET /api/v1/book/liked
```

| Parametro | Tipo     | Descripción                       | Por defecto |
| :-------- | :------- | :-------------------------------- | :----------------- |
| `limit`      | `int` | **Opcional**. Cantidad de libros que quieres obtener | 4 |

#### Obtener los libros mas visitados

```http
  GET /api/v1/book/visited
```

| Parametro | Tipo     | Descripción                       | Por defecto |
| :-------- | :------- | :-------------------------------- | :----------------- |
| `limit`      | `int` | **Opcional**. Cantidad de libros que quieres obtener | 6 |

#### Obtener los generos disponibles

```http
  GET /api/v1/book/categories
```

## Desarrolladores

- [@Exaedro](https://www.github.com/Exaedro)
- [@Lesshugaa](https://github.com/Lesshugaa)
- [@Kani204](https://github.com/kani204)

