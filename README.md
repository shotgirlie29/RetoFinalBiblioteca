# BibliotecaApp — Spring Boot + Angular

Aplicación full-stack para gestión de una biblioteca.  
Relación 1:M → **Autor tiene muchos Libros**

---

## Tecnologías

| Capa       | Tecnología                     |
|------------|--------------------------------|
| Backend    | Java 17 + Spring Boot 3.2      |
| Base datos | H2 en memoria (JPA/Hibernate)  |
| Frontend   | Angular 19 (Standalone)        |

---

## Estructura del repositorio

```
biblioteca/
├── backend/          # Spring Boot
│   ├── src/
│   │   └── main/java/com/biblioteca/
│   │       ├── model/          # Autor.java, Libro.java (entidades JPA)
│   │       ├── repository/     # AutorRepository, LibroRepository
│   │       ├── service/        # AutorService, LibroService
│   │       ├── controller/     # AutorController, LibroController
│   │       ├── dto/            # AutorDTO, LibroDTO
│   │       └── DataInitializer.java  # Datos de ejemplo
│   └── pom.xml
│
├── frontend/         # Angular 19
    └── src/app/
        ├── models/             # Interfaces TypeScript
        ├── services/           # AutorService, LibroService (Observables)
        ├── components/
        │   ├── autores/        # Lista, Detalle, Formulario
        │   └── libros/         # Lista, Formulario
        ├── app.routes.ts       # Rutas con lazy loading
        └── app.config.ts       # Configuración standalone

```

---

## Arranque — Backend

### Requisitos
- Java 17+
- Maven 3.8+

### Pasos

```bash
cd backend
mvn spring-boot:run
```

El servidor arranca en **http://localhost:8080**

> La base de datos H2 se crea automáticamente en memoria.  
> Los datos de ejemplo se insertan al arrancar (`DataInitializer.java`).

### Consola H2 (opcional)
Accede a **http://localhost:8080/h2-console**  
- JDBC URL: `jdbc:h2:mem:bibliotecadb`
- Usuario: `sa` — Contraseña: *(vacía)*

---

## Arranque — Frontend

### Requisitos
- Node.js 18+
- npm 9+

### Pasos

```bash
cd frontend
npm install
npm start
```

La aplicación abre en **http://localhost:4200**

> ⚠️ El backend debe estar en ejecución antes de usar el frontend.

---

## Endpoints de la API REST

### Autores

| Método | Endpoint             | Descripción                            |
|--------|----------------------|----------------------------------------|
| GET    | /api/autores         | Listar todos los autores               |
| GET    | /api/autores/{id}    | Detalle de autor **con sus libros**    |
| POST   | /api/autores         | Crear nuevo autor                      |
| PUT    | /api/autores/{id}    | Actualizar autor                       |
| DELETE | /api/autores/{id}    | Eliminar autor (y sus libros)          |

### Libros

| Método | Endpoint                    | Descripción                      |
|--------|-----------------------------|----------------------------------|
| GET    | /api/libros                 | Listar todos los libros          |
| GET    | /api/libros/{id}            | Detalle de un libro              |
| GET    | /api/libros/autor/{autorId} | Libros de un autor (relación 1:M)|
| POST   | /api/libros                 | Crear nuevo libro                |
| PUT    | /api/libros/{id}            | Actualizar libro                 |
| DELETE | /api/libros/{id}            | Eliminar libro                   |

---

## Datos de ejemplo

Al arrancar el backend se insertan automáticamente:

- **3 autores**: García Márquez, Borges, Ana María Matute
- **8 libros** distribuidos entre los autores

También puedes cargarlos manualmente con el script `datos-ejemplo.sql`.

---

## Modelo de datos

```
AUTORES                    LIBROS
+------------------+       +----------------------+
| id (PK)          |       | id (PK)              |
| nombre           |  1:M  | titulo               |
| nacionalidad     |──────>| genero               |
| biografia        |       | anioPublicacion      |
+------------------+       | precio               |
                           | autor_id (FK)        |
                           +----------------------+
```
