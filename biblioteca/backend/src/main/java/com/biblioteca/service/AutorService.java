package com.biblioteca.service;

import com.biblioteca.dto.AutorDTO;
import com.biblioteca.dto.LibroDTO;
import com.biblioteca.model.Autor;
import com.biblioteca.repository.AutorRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class AutorService {

    private final AutorRepository autorRepository;

    // --- Mappers ---
    private AutorDTO.Response toResponse(Autor autor) {
        return new AutorDTO.Response(
                autor.getId(),
                autor.getNombre(),
                autor.getNacionalidad(),
                autor.getBiografia(),
                autor.getLibros().size()
        );
    }

    private AutorDTO.ResponseConLibros toResponseConLibros(Autor autor) {
        List<LibroDTO.Response> libros = autor.getLibros().stream()
                .map(l -> new LibroDTO.Response(
                        l.getId(), l.getTitulo(), l.getGenero(),
                        l.getAnioPublicacion(), l.getPrecio(),
                        autor.getId(), autor.getNombre()))
                .collect(Collectors.toList());

        return new AutorDTO.ResponseConLibros(
                autor.getId(),
                autor.getNombre(),
                autor.getNacionalidad(),
                autor.getBiografia(),
                libros
        );
    }

    // --- Operaciones ---

    @Transactional(readOnly = true)
    public List<AutorDTO.Response> listarTodos() {
        return autorRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public AutorDTO.ResponseConLibros obtenerPorId(Long id) {
        Autor autor = autorRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Autor no encontrado con id: " + id));
        return toResponseConLibros(autor);
    }

    public AutorDTO.Response crear(AutorDTO.Request request) {
        Autor autor = new Autor();
        autor.setNombre(request.getNombre());
        autor.setNacionalidad(request.getNacionalidad());
        autor.setBiografia(request.getBiografia());
        return toResponse(autorRepository.save(autor));
    }

    public AutorDTO.Response actualizar(Long id, AutorDTO.Request request) {
        Autor autor = autorRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Autor no encontrado con id: " + id));
        autor.setNombre(request.getNombre());
        autor.setNacionalidad(request.getNacionalidad());
        autor.setBiografia(request.getBiografia());
        return toResponse(autorRepository.save(autor));
    }

    public void eliminar(Long id) {
        if (!autorRepository.existsById(id)) {
            throw new EntityNotFoundException("Autor no encontrado con id: " + id);
        }
        autorRepository.deleteById(id);
    }
}
