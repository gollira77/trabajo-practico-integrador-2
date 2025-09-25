Sistema de Gestión de Blog Personal
Descripción del proyecto

Este proyecto es un sistema de gestión de blog personal desarrollado con Node.js y MongoDB. Permite la creación, actualización, eliminación y visualización de usuarios, artículos, comentarios y etiquetas (tags). Cuenta con autenticación mediante JWT, roles de usuario/admin y validaciones para asegurar la integridad de los datos.

Tecnologías utilizadas

Node.js: entorno de ejecución de JavaScript del lado del servidor.
Express: framework web para Node.js.
MongoDB: base de datos NoSQL.
Mongoose: ODM para modelar datos en MongoDB.
bcryptjs: para hashear y comparar contraseñas.
JWT (jsonwebtoken): para autenticación basada en tokens.
express-validator: para validaciones de inputs.
dotenv: para manejar variables de entorno.

Instalación y setup

Clonar el repositorio:

git clone <URL_DEL_REPOSITORIO>
cd trabajo-practico-integrador-2


Instalar dependencias:

npm install express mongoose dotenv express-validator cookie-parser jsonwebtoken bcryptjs cors


duplicar el .env.example y le ponemos de nombre ".env", configuramos variables de entorno (ejemplo):

PORT=3000
MONGO_URI=mongodb://localhost:27017/blogdb
JWT_SECRET=miSuperSecretoJWT
COOKIE_SECRET=miCookieSecreta

Correr el proyecto en modo desarrollo:

npm run dev

Correr el proyecto en modo producción:

npm start

Diseño de relaciones

Embebido: Profile dentro de User. Ventaja: acceso rápido a los datos del perfil. Desventaja: difícil de actualizar desde múltiples colecciones.

Referenciado: Articles y Tags mediante referencias (ObjectId). Ventaja: relación N:M eficiente y escalable. Desventaja: requiere populate para acceder a datos completos.


Endpoints de la API
Auth
1. Registro de usuario

URL: /api/auth/register

Método: POST

Body:

{
  "username": "franco",
  "email": "franco@example.com",
  "password": "Pass1234",
  "profile": {
    "firstName": "Franco",
    "lastName": "Villalba",
    "biography": "Desarrollador"
  }
}


Respuesta:

{ "message": "Usuario registrado con éxito" }


Acceso: público

2. Login

URL: /api/auth/login

Método: POST

Body:

{
  "email": "franco@example.com",
  "password": "Pass1234"
}


Respuesta:

{ "message": "Login exitoso" }


Acceso: público

3. Logout

URL: /api/auth/logout

Método: POST

Respuesta:

{ "message": "Sesión cerrada correctamente" }


Acceso: usuario autenticado (cookie token necesaria)

4. Perfil del usuario

URL: /api/auth/profile

Método: GET

Headers:

Cookie: token=<JWT>


Respuesta:

{
  "_id": "id_usuario",
  "username": "franco",
  "email": "franco@example.com",
  "role": "user",
  "profile": {
    "firstName": "Franco",
    "lastName": "Villalba",
    "biography": "Desarrollador"
  },
  "isDeleted": false,
  "createdAt": "...",
  "updatedAt": "..."
}


Acceso: usuario autenticado

Usuarios (solo admin puede modificar)

Base URL: /api/users

Listar usuarios

Método: GET

Headers: Cookie: token=<JWT>

Acceso: admin

Crear usuario

Método: POST

Body: igual que el registro de auth

Acceso: admin

Actualizar usuario

Método: PUT /api/users/:id

Headers: Cookie: token=<JWT>

Body: campos a actualizar

Acceso: admin

Eliminar usuario

Método: DELETE /api/users/:id

Headers: Cookie: token=<JWT>

Acceso: admin

Artículos

Base URL: /api/articles

Crear artículo

Método: POST

Headers: Cookie: token=<JWT>

Body ejemplo:

{
  "title": "Mi primer artículo",
  "content": "Contenido del artículo",
  "author": "id_usuario",
  "tags": []
}


Acceso: usuario autenticado

Listar todos los artículos

Método: GET

Acceso: usuario autenticado

Listar mis artículos

Método: GET /api/articles/my

Acceso: usuario autenticado

Obtener artículo por ID

Método: GET /api/articles/:id

Acceso: usuario autenticado

Actualizar artículo

Método: PUT /api/articles/:id

Headers: Cookie: token=<JWT>

Acceso: propietario o admin

Eliminar artículo (lógico)

Método: DELETE /api/articles/:id

Headers: Cookie: token=<JWT>

Acceso: propietario o admin

Notas: elimina comentarios asociados en cascada

Comentarios

Base URL: /api/comments

Crear comentario

Método: POST

Headers: Cookie: token=<JWT>

Body:

{
  "content": "Mi comentario",
  "article": "id_artículo",
  "author": "id_usuario"
}


Acceso: usuario autenticado

Listar comentarios de un artículo

Método: GET /api/comments/article/:articleId

Acceso: usuario autenticado

Listar mis comentarios

Método: GET /api/comments/my

Acceso: usuario autenticado

Actualizar comentario

Método: PUT /api/comments/:id

Acceso: propietario o admin

Eliminar comentario (lógico)

Método: DELETE /api/comments/:id

Acceso: propietario o admin

Tags

Base URL: /api/tags

Crear tag

Método: POST

Headers: Cookie: token=<JWT>

Body:

{
  "name": "NodeJS"
}


Acceso: admin

Listar tags

Método: GET

Acceso: usuario autenticado

Obtener tag por ID

Método: GET /api/tags/:id

Acceso: usuario autenticado

Actualizar tag

Método: PUT /api/tags/:id

Acceso: admin

Eliminar tag

Método: DELETE /api/tags/:id

Acceso: admin

Notas: elimina el tag de todos los artículos

Article-Tags (relación N:M)

Base URL: /api/article-tags

Agregar tag a artículo

Método: POST /api/article-tags/:articleId/tags/:tagId

Acceso: propietario o admin

Remover tag de artículo

Método: DELETE /api/article-tags/:articleId/tags/:tagId

Acceso: propietario o admin


Estructura de carpetas
src/
 ├─ controllers/
 ├─ helpers/
 ├─ middlewares/
 ├─ models/
 ├─ routes/
 └─ app.js


controllers: lógica de negocio

helpers: funciones auxiliares (bcrypt, JWT)

middlewares: validaciones y control de acceso

models: modelos de MongoDB

routes: endpoints de la API

Notas importantes

Contraseñas siempre hasheadas con bcryptjs

JWT para autenticación

Cookies HTTP only para mayor seguridad