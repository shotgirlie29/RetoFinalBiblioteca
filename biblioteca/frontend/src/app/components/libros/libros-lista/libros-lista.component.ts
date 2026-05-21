import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LibroService } from '../../../services/libro.service';
import { Libro } from '../../../models/index';

@Component({
  selector: 'app-libros-lista',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="page-header">
      <div>
        <h1 class="page-title">Libros</h1>
        <p class="page-subtitle">{{ totalLibros() }} libros en la biblioteca</p>
      </div>
      <a routerLink="/libros/nuevo" class="btn btn-primary">+ Nuevo Libro</a>
    </div>

    @if (loading()) {
      <div class="loading-state">
        <div class="spinner"></div>
        <p>Cargando libros...</p>
      </div>
    }

    @if (error()) {
      <div class="alert alert-error">{{ error() }}</div>
    }

    @if (!loading() && !error()) {
      <table class="tabla">
        <thead>
          <tr>
            <th>Título</th>
            <th>Autor</th>
            <th>Género</th>
            <th>Año</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          @for (libro of libros(); track libro.id) {
            <tr>
              <td class="td-titulo">{{ libro.titulo }}</td>
              <td>
                <a [routerLink]="['/autores', libro.autorId]" class="autor-link">
                  {{ libro.autorNombre }}
                </a>
              </td>
              <td><span class="badge-genero">{{ libro.genero }}</span></td>
              <td>{{ libro.anioPublicacion }}</td>
              <td>
                @if (libro.precio) {
                  {{ libro.precio | currency:'EUR':'symbol':'1.2-2' }}
                } @else {
                  <span class="color-muted">—</span>
                }
              </td>
              <td>
                <div class="acciones">
                  <button (click)="eliminar(libro.id)" class="btn btn-sm btn-danger">Eliminar</button>
                </div>
              </td>
            </tr>
          }

          @empty {
            <tr>
              <td colspan="6" class="td-empty">
                No hay libros registrados.
                <a routerLink="/libros/nuevo">Añade el primero</a>
              </td>
            </tr>
          }
        </tbody>
      </table>
    }
  `,
  styles: [`
    .page-header {
      display: flex; justify-content: space-between;
      align-items: flex-start; margin-bottom: 2rem;
    }
    .page-title { font-size: 1.75rem; font-weight: 700; color: var(--color-text); margin: 0; font-family: var(--font-display); }
    .page-subtitle { color: var(--color-muted); margin: 0.25rem 0 0; }

    .tabla { width: 100%; border-collapse: collapse; background: var(--color-surface); border-radius: 10px; overflow: hidden; box-shadow: var(--shadow-sm); }
    .tabla thead { background: var(--color-bg-alt); }
    .tabla th { padding: 0.875rem 1rem; text-align: left; font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-muted); }
    .tabla td { padding: 0.875rem 1rem; border-top: 1px solid var(--color-border); font-size: 0.9rem; color: var(--color-text); }
    .tabla tbody tr:hover { background: var(--color-bg-alt); }

    .td-titulo { font-weight: 500; }

    .autor-link { color: var(--color-primary); text-decoration: none; font-weight: 500; }
    .autor-link:hover { text-decoration: underline; }

    .badge-genero {
      background: var(--color-primary-light);
      color: var(--color-primary);
      padding: 0.2rem 0.6rem;
      border-radius: 4px;
      font-size: 0.78rem;
      font-weight: 500;
    }

    .acciones { display: flex; gap: 0.375rem; }

    .td-empty { text-align: center; padding: 2.5rem !important; color: var(--color-muted); }
    .td-empty a { color: var(--color-primary); }

    .loading-state {
      display: flex; flex-direction: column; align-items: center;
      gap: 1rem; padding: 3rem; color: var(--color-muted);
    }
    .color-muted { color: var(--color-muted); }
  `]
})
export class LibrosListaComponent implements OnInit {

  // Signals
  libros = signal<Libro[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  totalLibros = computed(() => this.libros().length);

  constructor(private libroService: LibroService) {}

  ngOnInit(): void {
    this.cargarLibros();
  }

  cargarLibros(): void {
    this.loading.set(true);
    this.error.set(null);

    this.libroService.getAll().subscribe({
      next: (data) => {
        this.libros.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('No se pudieron cargar los libros. ¿Está el backend en ejecución?');
        this.loading.set(false);
        console.error(err);
      }
    });
  }

  eliminar(id: number): void {
    if (!confirm('¿Eliminar este libro?')) return;

    this.libroService.delete(id).subscribe({
      next: () => this.libros.update(lista => lista.filter(l => l.id !== id)),
      error: () => this.error.set('Error al eliminar el libro.')
    });
  }
}
