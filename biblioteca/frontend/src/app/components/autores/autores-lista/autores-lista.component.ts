import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AutorService } from '../../../services/autor.service';
import { Autor } from '../../../models/index';

@Component({
  selector: 'app-autores-lista',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="page-header">
      <div>
        <h1 class="page-title">Autores</h1>
        <p class="page-subtitle">{{ totalAutores() }} autores registrados</p>
      </div>
      <a routerLink="/autores/nuevo" class="btn btn-primary">
        + Nuevo Autor
      </a>
    </div>

    @if (loading()) {
      <div class="loading-state">
        <div class="spinner"></div>
        <p>Cargando autores...</p>
      </div>
    }

    @if (error()) {
      <div class="alert alert-error">
        <strong>Error:</strong> {{ error() }}
      </div>
    }

    @if (!loading() && !error()) {
      <div class="cards-grid">
        @for (autor of autores(); track autor.id) {
          <div class="card autor-card">
            <div class="card-header">
              <div class="autor-avatar">{{ getInitials(autor.nombre) }}</div>
              <div>
                <h3 class="autor-nombre">{{ autor.nombre }}</h3>
                <span class="autor-nacionalidad">{{ autor.nacionalidad }}</span>
              </div>
            </div>
            @if (autor.biografia) {
              <p class="autor-bio">{{ autor.biografia | slice:0:120 }}{{ autor.biografia.length > 120 ? '...' : '' }}</p>
            }
            <div class="card-footer">
              <span class="badge">{{ autor.totalLibros }} libro{{ autor.totalLibros !== 1 ? 's' : '' }}</span>
              <div class="card-actions">
                <a [routerLink]="['/autores', autor.id]" class="btn btn-sm btn-secondary">Ver detalle</a>
                <a [routerLink]="['/autores', autor.id, 'editar']" class="btn btn-sm btn-outline">Editar</a>
                <button (click)="eliminar(autor.id)" class="btn btn-sm btn-danger">Eliminar</button>
              </div>
            </div>
          </div>
        }

        @empty {
          <div class="empty-state">
            <p>No hay autores registrados.</p>
            <a routerLink="/autores/nuevo" class="btn btn-primary">Añadir el primero</a>
          </div>
        }
      </div>
    }
  `,
  styles: [`
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 2rem;
    }
    .page-title { font-size: 1.75rem; font-weight: 700; color: var(--color-text); margin: 0; font-family: var(--font-display); }
    .page-subtitle { color: var(--color-muted); margin: 0.25rem 0 0; }

    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 1.25rem;
    }

    .autor-card { display: flex; flex-direction: column; gap: 0.75rem; }

    .card-header {
      display: flex;
      align-items: center;
      gap: 0.875rem;
    }

    .autor-avatar {
      width: 48px; height: 48px;
      border-radius: 50%;
      background: var(--color-primary);
      color: white;
      display: flex; align-items: center; justify-content: center;
      font-weight: 700; font-size: 1rem;
      flex-shrink: 0;
    }

    .autor-nombre { font-size: 1rem; font-weight: 600; margin: 0; color: var(--color-text); }
    .autor-nacionalidad { font-size: 0.8rem; color: var(--color-muted); }
    .autor-bio { font-size: 0.875rem; color: var(--color-muted); margin: 0; line-height: 1.5; }

    .card-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: auto;
      padding-top: 0.75rem;
      border-top: 1px solid var(--color-border);
    }

    .card-actions { display: flex; gap: 0.375rem; }

    .loading-state {
      display: flex; flex-direction: column; align-items: center;
      gap: 1rem; padding: 3rem; color: var(--color-muted);
    }

    .empty-state {
      grid-column: 1/-1;
      text-align: center;
      padding: 3rem;
      color: var(--color-muted);
    }
  `]
})
export class AutoresListaComponent implements OnInit {

  // Signals para manejo de estado
  autores = signal<Autor[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  // Signal computada
  totalAutores = computed(() => this.autores().length);

  constructor(private autorService: AutorService) {}

  ngOnInit(): void {
    this.cargarAutores();
  }

  cargarAutores(): void {
    this.loading.set(true);
    this.error.set(null);

    this.autorService.getAll().subscribe({
      next: (data) => {
        this.autores.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('No se pudieron cargar los autores. ¿Está el backend en ejecución?');
        this.loading.set(false);
        console.error(err);
      }
    });
  }

  eliminar(id: number): void {
    if (!confirm('¿Estás seguro de que quieres eliminar este autor? Se eliminarán todos sus libros.')) return;

    this.autorService.delete(id).subscribe({
      next: () => {
        this.autores.update(lista => lista.filter(a => a.id !== id));
      },
      error: (err) => {
        this.error.set('Error al eliminar el autor.');
        console.error(err);
      }
    });
  }

  getInitials(nombre: string): string {
    return nombre.split(' ')
      .slice(0, 2)
      .map(n => n[0])
      .join('')
      .toUpperCase();
  }
}
