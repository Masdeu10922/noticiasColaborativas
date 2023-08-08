# Web de noticias colaborativas.

Implementar una API que permita gestionar noticias colaborativas, estilo reddit o menéame, donde los usuarios puedan registrarse y publicar una noticia en una serie de categorías temáticas fijas.

## Base de datos

### users

| Campo     | Tipo         | Descripción                          |
| --------- | ------------ | ------------------------------------ |
| id        | INT UNSIGNED | Identificador único del usuario      |
| email     | VARCHAR(100) | Correo electrónico del usuario       |
| userName  | VARCHAR(100) | Nombre del usuario                   |
| password  | VARCHAR(100) | Contraseña del usuario (hash)        |
| biography | TEXT         | Biogradía del usuario                |
| photo     | VARCHAR(100) | Foto del usuario                     |
| createdAt | DATETIME     | Fecha y hora de creación del usuario |

### news

| Campo     | Tipo         | Descripción                       |
| --------- | ------------ | --------------------------------- |
| id        | INT UNSIGNED | Identificador único de la noticia |
| title     | VARCHAR(100) | Nombre del usuario                |
| photo     | VARCHAR(200) | Foto de la noticia                |
| intro     | TEXT         | Entradilla de la noticia          |
| text      | TEXT         | Texto de la noticia               |
| topic     | ENUM         | Tema de la noticia                |
| userId    | INT UNSIGNED | Identidicador del usuario         |
| createdAt | DATETIME     | Fecha de creación de la noticia   |

valid topics: ciencia, deportes, cultura, politica, actualidad

### votes

| Campo     | Tipo         | Descripción                                     |
| --------- | ------------ | ----------------------------------------------- |
| id        | INT UNSIGNED | Identificador único de la noticia               |
| value     | TINYINT      | Registrar si el voto es "positivo" o "negativo" |
| usersId   | INT UNSIGNED | Identidicador del usuario                       |
| newsId    | INT UNSIGNED | Identidicador de la noticia                     |
| createdAt | DATETIME     | Fecha de creación del voto                      |

## Endpoints del usuario ✅

-   **POST** - [`/users/register`] - Crea un nuevo usuario. ✅
-   **POST** - [`/users/login`] - Loguea a un usuario. ✅
-   **GET** - [`/users/:userId`] - Permite acceder al perfil público de un usuario.✅
-   **GET** - [`/users/users`] - Permite acceder al perfil privado de un usuario.✅
-   **PUT** - [`/users/photo`] - Permite actualizar la foto del usuario.✅
    **PUT** - [`/users/password`] - Permite actualizar la contraseña usuario.✅
    **PUT** - [`/users/email`] - Permite actualizar el email usuario.✅
    **PUT** - [`/users/biography`] - Permite actualizar la biografia del usuario.✅

## Endpoints de las noticias✅

-   **POST** - [`/news`] - Permite añadir una noticia.✅
-   **GET** - [`/news/:newsId`] - Retorna información de una noticia.✅
-   **GET** - [`/news`] - Retorna el listado de noticias.✅
-   **POST** - [`/news/:newsId/photo`] - Añadir una foto a una noticia.✅
-   **POST** - [`/news/:newsId/votes`] - Votar una noticia positivamente o negativamente.✅
-   **DELETE** - [`/news/:newsId/delete`] - Borrar una noticia. ✅
-   **PUT** - [`/news/:newsId/`] - Edita una noticia.✅
