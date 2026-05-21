import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Autor, AutorConLibros, AutorRequest } from '../models/index';

@Injectable({
  providedIn: 'root'
})
export class AutorService {

  private readonly apiUrl = 'http://localhost:8080/api/autores';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Autor[]> {
    return this.http.get<Autor[]>(this.apiUrl);
  }

  getById(id: number): Observable<AutorConLibros> {
    return this.http.get<AutorConLibros>(`${this.apiUrl}/${id}`);
  }

  create(autor: AutorRequest): Observable<Autor> {
    return this.http.post<Autor>(this.apiUrl, autor);
  }

  update(id: number, autor: AutorRequest): Observable<Autor> {
    return this.http.put<Autor>(`${this.apiUrl}/${id}`, autor);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
