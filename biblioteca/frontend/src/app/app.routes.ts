import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/autores',
    pathMatch: 'full'
  },
  {
    path: 'autores',
    loadComponent: () =>
      import('./components/autores/autores-lista/autores-lista.component')
        .then(m => m.AutoresListaComponent)
  },
  {
    path: 'autores/nuevo',
    loadComponent: () =>
      import('./components/autores/autor-form/autor-form.component')
        .then(m => m.AutorFormComponent)
  },
  {
    path: 'autores/:id',
    loadComponent: () =>
      import('./components/autores/autor-detalle/autor-detalle.component')
        .then(m => m.AutorDetalleComponent)
  },
  {
    path: 'autores/:id/editar',
    loadComponent: () =>
      import('./components/autores/autor-form/autor-form.component')
        .then(m => m.AutorFormComponent)
  },
  {
    path: 'libros',
    loadComponent: () =>
      import('./components/libros/libros-lista/libros-lista.component')
        .then(m => m.LibrosListaComponent)
  },
  {
    path: 'libros/nuevo',
    loadComponent: () =>
      import('./components/libros/libro-form/libro-form.component')
        .then(m => m.LibroFormComponent)
  },
  {
    path: '**',
    redirectTo: '/autores'
  }
];
