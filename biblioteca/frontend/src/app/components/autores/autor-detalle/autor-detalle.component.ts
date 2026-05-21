import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { AutorService } from '../../../services/autor.service';
import { AutorConLibros } from '../../../models/index';

@Component({
  selector: 'app-autor-detalle',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="back-link">
      <a routerLink="/autores" class="btn btn-outline btn-sm">← Volver a Autores</a>
    </div>

    @if (loading()) {
      <div class="loading-state">
        <div class="spinner"></div>
        <p>Cargando autor...</p>
      </div>
    }

    @if (error()) {
      <div class="alert alert-error">{{ error() }}</div>
    }

    @if (autor(); as a) {
      <div class="detalle-layout">
        <div class="autor-header card">
          <div class="autor-avatar-lg">{{ getInitials(a.nombre) }}</div>
          <div class="autor-info">
            <h1 class="autor-nombre">{{ a.nombre }}</h1>
            <p class="autor-meta"> {{ a.nacionalidad }}</p>
            @if (a.biografia) {
              <p class="autor-bio">{{ a.biografia }}</p>
            }
          </div>
          <div class="autor-acciones">
            <a [routerLink]="['/autores', a.id, 'editar']" class="btn btn-outline">Editar</a>
          </div>
        </div>

        <section class="libros-section">
          <div class="section-header">
            <h2 class="section-title">
              Libros de {{ a.nombre }}
              <span class="badge">{{ a.libros.length }}</span>
            </h2>
            <a routerLink="/libros/nuevo" class="btn btn-primary btn-sm">+ Añadir libro</a>
          </div>

          @if (a.libros.length > 0) {
            <div class="libros-grid">
              @for (libro of a.libros; track libro.id) {
                <div class="card libro-card">
                  <div class="libro-anio">{{ libro.anioPublicacion }}</div>
                  <h3 class="libro-titulo">{{ libro.titulo }}</h3>
                  <span class="libro-genero">{{ libro.genero }}</span>
                  @if (libro.precio) {
                    <span class="libro-precio">{{ libro.precio | currency:'EUR':'symbol':'1.2-2' }}</span>
                  }
                </div>
              }
            </div>
          } @else {
            <div class="empty-state">
              <p>Este autor no tiene libros registrados.</p>
              <a routerLink="/libros/nuevo" class="btn btn-primary">Añadir primer libro</a>
            </div>
          }
        </section>
      </div>
    }
  `,
  styles: [`
    .back-link { margin-bottom: 1.5rem; }

    .detalle-layout { display: flex; flex-direction: column; gap: 1.5rem; }

    .autor-header {
      display: flex;
      align-items: flex-start;
      gap: 1.5rem;
    }

    .autor-avatar-lg {
      width: 72px; height: 72px;
      border-radius: 50%;
      background: var(--color-primary);
      color: white;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.5rem; font-weight: 700;
      flex-shrink: 0;
    }

    .autor-info { flex: 1; }
    .autor-nombre { font-size: 1.5rem; font-weight: 700; margin: 0 0 0.25rem; color: var(--color-text); }
    .autor-meta { margin: 0 0 0.5rem; color: var(--color-muted); }
    .autor-bio { margin: 0; color: var(--color-text); line-height: 1.6; }
    .autor-acciones { flex-shrink: 0; }

    .section-header {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: 1rem;
    }
    .section-title {
      font-size: 1.25rem; font-weight: 600;
      display: flex; align-items: center; gap: 0.5rem; margin: 0;
      color: var(--color-text);
    }

    .libros-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem;
    }

    .libro-card {
      display: flex; flex-direction: column; gap: 0.375rem;
      position: relative; overflow: hidden;
    }

    .libro-anio {
      font-size: 0.75rem; font-weight: 700;
      color: var(--color-primary); letter-spacing: 0.05em;
    }
    .libro-titulo { font-size: 0.95rem; font-weight: 600; margin: 0; color: var(--color-text); }
    .libro-genero {
      display: inline-block;
      font-size: 0.75rem; padding: 0.2rem 0.5rem;
      background: var(--color-bg-alt);
      border-radius: 4px; color: var(--color-muted);
    }
    .libro-precio { font-weight: 600; color: var(--color-primary); font-size: 0.9rem; }

    .loading-state {
      display: flex; flex-direction: column; align-items: center;
      gap: 1rem; padding: 3rem; color: var(--color-muted);
    }
    .empty-state {
      text-align: center; padding: 2rem; color: var(--color-muted);
    }
  `]
})
export class AutorDetalleComponent implements OnInit {

  autor = signal<AutorConLibros | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);

  constructor(
    private route: ActivatedRoute,
    private autorService: AutorService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loading.set(true);

    this.autorService.getById(id).subscribe({
      next: (data) => {
        this.autor.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('No se pudo cargar el autor.');
        this.loading.set(false);
        console.error(err);
      }
    });
  }

  getInitials(nombre: string): string {
    return nombre.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();
  }
}
