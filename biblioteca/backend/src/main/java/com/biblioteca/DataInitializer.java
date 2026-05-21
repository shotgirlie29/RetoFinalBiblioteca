package com.biblioteca;

import com.biblioteca.model.Autor;
import com.biblioteca.model.Libro;
import com.biblioteca.repository.AutorRepository;
import com.biblioteca.repository.LibroRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final AutorRepository autorRepository;
    private final LibroRepository libroRepository;

    @Override
    public void run(String... args) {
        log.info("Cargando datos de ejemplo...");

        // Autores
        Autor garcia = new Autor();
        garcia.setNombre("Gabriel García Márquez");
        garcia.setNacionalidad("Colombiana");
        garcia.setBiografia("Premio Nobel de Literatura 1982. Máximo representante del realismo mágico.");
        autorRepository.save(garcia);

        Autor borges = new Autor();
        borges.setNombre("Jorge Luis Borges");
        borges.setNacionalidad("Argentina");
        borges.setBiografia("Escritor argentino, uno de los más importantes de la literatura en español.");
        autorRepository.save(borges);

        Autor matute = new Autor();
        matute.setNombre("Ana María Matute");
        matute.setNacionalidad("Española");
        matute.setBiografia("Premio Cervantes 2010. Escritora española de la generación de posguerra.");
        autorRepository.save(matute);

        // Libros de García Márquez
        crearLibro("Cien años de soledad", "Realismo Mágico", 1967, 12.99, garcia);
        crearLibro("El amor en los tiempos del cólera", "Romance", 1985, 11.50, garcia);
        crearLibro("Crónica de una muerte anunciada", "Novela", 1981, 9.99, garcia);

        // Libros de Borges
        crearLibro("Ficciones", "Cuentos", 1944, 10.99, borges);
        crearLibro("El Aleph", "Cuentos", 1949, 10.50, borges);
        crearLibro("Laberintos", "Ensayo", 1962, 13.00, borges);

        // Libros de Matute
        crearLibro("Los hijos muertos", "Novela", 1958, 8.99, matute);
        crearLibro("Primera memoria", "Novela", 1960, 9.50, matute);

        log.info("Datos cargados: {} autores, {} libros",
                autorRepository.count(), libroRepository.count());
    }

    private void crearLibro(String titulo, String genero, int anio, double precio, Autor autor) {
        Libro libro = new Libro();
        libro.setTitulo(titulo);
        libro.setGenero(genero);
        libro.setAnioPublicacion(anio);
        libro.setPrecio(precio);
        libro.setAutor(autor);
        libroRepository.save(libro);
    }
}
