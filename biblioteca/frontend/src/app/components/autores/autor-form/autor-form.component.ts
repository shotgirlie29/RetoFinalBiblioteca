import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutorService } from '../../../services/autor.service';

@Component({
  selector: 'app-autor-form',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  template: `
    <div class="back-link">
      <a routerLink="/autores" class="btn btn-outline btn-sm">← Volver</a>
    </div>

    <div class="form-page">
      <h1 class="page-title">{{ esEdicion() ? 'Editar Autor' : 'Nuevo Autor' }}</h1>

      @if (error()) {
        <div class="alert alert-error">{{ error() }}</div>
      }
      @if (exito()) {
        <div class="alert alert-success">{{ exito() }}</div>
      }

      <div class="card form-card">
        <form [formGroup]="form" (ngSubmit)="onSubmit()">

          <div class="form-group">
            <label for="nombre" class="form-label">Nombre completo *</label>
            <input
              id="nombre"
              type="text"
              formControlName="nombre"
              class="form-control"
              [class.is-invalid]="isInvalid('nombre')"
              placeholder="Ej: Gabriel García Márquez"
            />
            @if (isInvalid('nombre')) {
              <div class="form-error">
                @if (form.get('nombre')?.errors?.['required']) { El nombre es obligatorio. }
                @if (form.get('nombre')?.errors?.['minlength']) { Mínimo 2 caracteres. }
                @if (form.get('nombre')?.errors?.['maxlength']) { Máximo 100 caracteres. }
              </div>
            }
          </div>

          <div class="form-group">
            <label for="nacionalidad" class="form-label">Nacionalidad *</label>
            <input
              id="nacionalidad"
              type="text"
              formControlName="nacionalidad"
              class="form-control"
              [class.is-invalid]="isInvalid('nacionalidad')"
              placeholder="Ej: Colombiana"
            />
            @if (isInvalid('nacionalidad')) {
              <div class="form-error">La nacionalidad es obligatoria.</div>
            }
          </div>

          <div class="form-group">
            <label for="biografia" class="form-label">Biografía</label>
            <textarea
              id="biografia"
              formControlName="biografia"
              class="form-control"
              rows="4"
              placeholder="Breve descripción del autor..."
            ></textarea>
            @if (isInvalid('biografia')) {
              <div class="form-error">Máximo 500 caracteres.</div>
            }
          </div>

          <div class="form-actions">
            <a routerLink="/autores" class="btn btn-outline">Cancelar</a>
            <button type="submit" class="btn btn-primary" [disabled]="form.invalid || guardando()">
              @if (guardando()) { Guardando... }
              @else { {{ esEdicion() ? 'Actualizar' : 'Crear Autor' }} }
            </button>
          </div>

        </form>
      </div>
    </div>
  `,
  styles: [`
    .form-page { max-width: 600px; }
    .page-title { font-size: 1.5rem; font-weight: 700; margin-bottom: 1.5rem; color: var(--color-text); }
    .form-card { padding: 1.75rem; }
    .form-group { margin-bottom: 1.25rem; }
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
    textarea.form-control { resize: vertical; }
    .form-error { color: #e53e3e; font-size: 0.8rem; margin-top: 0.25rem; }
    .form-actions { display: flex; gap: 0.75rem; justify-content: flex-end; margin-top: 1.5rem; }
    .back-link { margin-bottom: 1.5rem; }
  `]
})
export class AutorFormComponent implements OnInit {

  form!: FormGroup;

  // Signals para estado del formulario
  esEdicion = signal(false);
  guardando = signal(false);
  error = signal<string | null>(null);
  exito = signal<string | null>(null);

  private autorId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private autorService: AutorService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      nacionalidad: ['', Validators.required],
      biografia: ['', Validators.maxLength(500)]
    });

    // Comprobar si estamos editando
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.esEdicion.set(true);
      this.autorId = Number(id);
      this.cargarAutor(this.autorId);
    }
  }

  cargarAutor(id: number): void {
    this.autorService.getById(id).subscribe({
      next: (autor) => {
        this.form.patchValue({
          nombre: autor.nombre,
          nacionalidad: autor.nacionalidad,
          biografia: autor.biografia
        });
      },
      error: () => this.error.set('No se pudo cargar el autor para editar.')
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.guardando.set(true);
    this.error.set(null);

    const datos = this.form.value;

    const operacion = this.esEdicion() && this.autorId
      ? this.autorService.update(this.autorId, datos)
      : this.autorService.create(datos);

    operacion.subscribe({
      next: () => {
        this.guardando.set(false);
        this.router.navigate(['/autores']);
      },
      error: (err) => {
        this.guardando.set(false);
        this.error.set('Error al guardar. Revisa los datos e inténtalo de nuevo.');
        console.error(err);
      }
    });
  }

  isInvalid(campo: string): boolean {
    const control = this.form.get(campo);
    return !!(control?.invalid && control?.touched);
  }
}
