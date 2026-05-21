package com.biblioteca.service;

import com.biblioteca.dto.LibroDTO;
import com.biblioteca.model.Autor;
import com.biblioteca.model.Libro;
import com.biblioteca.repository.AutorRepository;
import com.biblioteca.repository.LibroRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class LibroService {

    private final LibroRepository libroRepository;
    private final AutorRepository autorRepository;

    // --- Mapper ---
    private LibroDTO.Response toResponse(Libro libro) {
        return new LibroDTO.Response(
                libro.getId(),
                libro.getTitulo(),
                libro.getGenero(),
                libro.getAnioPublicacion(),
                libro.getPrecio(),
                libro.getAutor().getId(),
                libro.getAutor().getNombre()
        );
    }

    // --- Operaciones ---

    @Transactional(readOnly = true)
    public List<LibroDTO.Response> listarTodos() {
        return libroRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public LibroDTO.Response obtenerPorId(Long id) {
        Libro libro = libroRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Libro no encontrado con id: " + id));
        return toResponse(libro);
    }

    @Transactional(readOnly = true)
    public List<LibroDTO.Response> listarPorAutor(Long autorId) {
        if (!autorRepository.existsById(autorId)) {
            throw new EntityNotFoundException("Autor no encontrado con id: " + autorId);
        }
        return libroRepository.findByAutorId(autorId).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public LibroDTO.Response crear(LibroDTO.Request request) {
        Autor autor = autorRepository.findById(request.getAutorId())
                .orElseThrow(() -> new EntityNotFoundException("Autor no encontrado con id: " + request.getAutorId()));

        Libro libro = new Libro();
        libro.setTitulo(request.getTitulo());
        libro.setGenero(request.getGenero());
        libro.setAnioPublicacion(request.getAnioPublicacion());
        libro.setPrecio(request.getPrecio());
        libro.setAutor(autor);

        return toResponse(libroRepository.save(libro));
    }

    public LibroDTO.Response actualizar(Long id, LibroDTO.Request request) {
        Libro libro = libroRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Libro no encontrado con id: " + id));

        Autor autor = autorRepository.findById(request.getAutorId())
                .orElseThrow(() -> new EntityNotFoundException("Autor no encontrado con id: " + request.getAutorId()));

        libro.setTitulo(request.getTitulo());
        libro.setGenero(request.getGenero());
        libro.setAnioPublicacion(request.getAnioPublicacion());
        libro.setPrecio(request.getPrecio());
        libro.setAutor(autor);

        return toResponse(libroRepository.save(libro));
    }

    public void eliminar(Long id) {
        if (!libroRepository.existsById(id)) {
            throw new EntityNotFoundException("Libro no encontrado con id: " + id);
        }
        libroRepository.deleteById(id);
    }
}
