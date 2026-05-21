// models/autor.model.ts
export interface Autor {
  id: number;
  nombre: string;
  nacionalidad: string;
  biografia: string;
  totalLibros: number;
}

export interface AutorConLibros extends Omit<Autor, 'totalLibros'> {
  libros: Libro[];
}

export interface AutorRequest {
  nombre: string;
  nacionalidad: string;
  biografia: string;
}

// models/libro.model.ts
export interface Libro {
  id: number;
  titulo: string;
  genero: string;
  anioPublicacion: number;
  precio: number;
  autorId: number;
  autorNombre: string;
}

export interface LibroRequest {
  titulo: string;
  genero: string;
  anioPublicacion: number;
  precio: number;
  autorId: number;
}
