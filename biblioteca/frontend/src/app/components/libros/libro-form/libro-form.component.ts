import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LibroService } from '../../../services/libro.service';
import { AutorService } from '../../../services/autor.service';
import { Autor } from '../../../models/index';

@Component({
  selector: 'app-libro-form',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  template: `
    <div class="back-link">
      <a routerLink="/libros" class="btn btn-outline btn-sm">← Volver a Libros</a>
    </div>

    <div class="form-page">
      <h1 class="page-title">Nuevo Libro</h1>

      @if (error()) {
        <div class="alert alert-error">{{ error() }}</div>
      }

      <div class="card form-card">
        <form [formGroup]="form" (ngSubmit)="onSubmit()">

          <div class="form-group">
            <label for="titulo" class="form-label">Título *</label>
            <input
              id="titulo"
              type="text"
              formControlName="titulo"
              class="form-control"
              [class.is-invalid]="isInvalid('titulo')"
              placeholder="Ej: Cien años de soledad"
            />
            @if (isInvalid('titulo')) {
              <div class="form-error">El título es obligatorio.</div>
            }
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="genero" class="form-label">Género *</label>
              <input
                id="genero"
                type="text"
                formControlName="genero"
                class="form-control"
                [class.is-invalid]="isInvalid('genero')"
                placeholder="Ej: Novela, Ensayo..."
              />
              @if (isInvalid('genero')) {
                <div class="form-error">El género es obligatorio.</div>
              }
            </div>

            <div class="form-group">
              <label for="anioPublicacion" class="form-label">Año de publicación *</label>
              <input
                id="anioPublicacion"
                type="number"
                formControlName="anioPublicacion"
                class="form-control"
                [class.is-invalid]="isInvalid('anioPublicacion')"
                placeholder="Ej: 1967"
              />
              @if (isInvalid('anioPublicacion')) {
                <div class="form-error">
                  @if (form.get('anioPublicacion')?.errors?.['required']) { El año es obligatorio. }
                  @if (form.get('anioPublicacion')?.errors?.['min'] || form.get('anioPublicacion')?.errors?.['max']) { Año no válido. }
                </div>
              }
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="precio" class="form-label">Precio (€)</label>
              <input
                id="precio"
                type="number"
                step="0.01"
                formControlName="precio"
                class="form-control"
                placeholder="Ej: 12.99"
              />
            </div>

            <div class="form-group">
              <label for="autorId" class="form-label">Autor *</label>
              <select
                id="autorId"
                formControlName="autorId"
                class="form-control"
                [class.is-invalid]="isInvalid('autorId')"
              >
                <option value="">— Selecciona un autor —</option>
                @for (autor of autores(); track autor.id) {
                  <option [value]="autor.id">{{ autor.nombre }}</option>
                }
              </select>
              @if (isInvalid('autorId')) {
                <div class="form-error">Debes seleccionar un autor.</div>
              }
            </div>
          </div>

          <div class="form-actions">
            <a routerLink="/libros" class="btn btn-outline">Cancelar</a>
            <button type="submit" class="btn btn-primary" [disabled]="form.invalid || guardando()">
              @if (guardando()) { Guardando... }
              @else { Crear Libro }
            </button>
          </div>

        </form>
      </div>
    </div>
  `,
  styles: [`
    .form-page { max-width: 640px; }
    .page-title { font-size: 1.5rem; font-weight: 700; margin-bottom: 1.5rem; color: var(--color-text); }
    .form-card { padding: 1.75rem; }
    .form-group { margin-bottom: 1.25rem; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    .form-label { display: block; font-weight: 500; margin-bottom: 0.375rem; font-size: 0.9rem; color: var(--color-text); }
    .form-control {
      width: 100%; padding: 0.625rem 0.75rem;
      border: 1.5px solid var(--color-border);
      border-radius: 8px; font-size: 0.925rem;
      background: var(--color-bg);
      color: var(--color-text);
      transition: border-color 0.2s;
      box-sizing: border-box;
    }
    .form-control:focus { outline: none; border-color: var(--color-primary); }
    .form-control.is-invalid { border-color: #e53e3e; }
    .form-error { color: #e53e3e; font-size: 0.8rem; margin-top: 0.25rem; }
    .form-actions { display: flex; gap: 0.75rem; justify-content: flex-end; margin-top: 1.5rem; }
    .back-link { margin-bottom: 1.5rem; }
  `]
})
export class LibroFormComponent implements OnInit {

  form!: FormGroup;

  // Signals
  autores = signal<Autor[]>([]);
  guardando = signal(false);
  error = signal<string | null>(null);

  constructor(
    private fb: FormBuilder,
    private libroService: LibroService,
    private autorService: AutorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(200)]],
      genero: ['', Validators.required],
      anioPublicacion: ['', [Validators.required, Validators.min(1000), Validators.max(2100)]],
      precio: [null],
      autorId: ['', Validators.required]
    });

    // Cargar autores para el select
    this.autorService.getAll().subscribe({
      next: (data) => this.autores.set(data),
      error: () => this.error.set('No se pudieron cargar los autores.')
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.guardando.set(true);
    this.error.set(null);

    const datos = {
      ...this.form.value,
      autorId: Number(this.form.value.autorId),
      anioPublicacion: Number(this.form.value.anioPublicacion),
      precio: this.form.value.precio ? Number(this.form.value.precio) : null
    };

    this.libroService.create(datos).subscribe({
      next: () => {
        this.guardando.set(false);
        this.router.navigate(['/libros']);
      },
      error: (err) => {
        this.guardando.set(false);
        this.error.set('Error al crear el libro. Revisa los datos.');
        console.error(err);
      }
    });
  }

  isInvalid(campo: string): boolean {
    const control = this.form.get(campo);
    return !!(control?.invalid && control?.touched);
  }
}
