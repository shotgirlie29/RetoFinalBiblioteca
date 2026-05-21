import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Libro, LibroRequest } from '../models/index';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  private readonly apiUrl = 'http://localhost:8080/api/libros';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.apiUrl);
  }

  getById(id: number): Observable<Libro> {
    return this.http.get<Libro>(`${this.apiUrl}/${id}`);
  }

  getByAutor(autorId: number): Observable<Libro[]> {
    return this.http.get<Libro[]>(`${this.apiUrl}/autor/${autorId}`);
  }

  create(libro: LibroRequest): Observable<Libro> {
    return this.http.post<Libro>(this.apiUrl, libro);
  }

  update(id: number, libro: LibroRequest): Observable<Libro> {
    return this.http.put<Libro>(`${this.apiUrl}/${id}`, libro);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
