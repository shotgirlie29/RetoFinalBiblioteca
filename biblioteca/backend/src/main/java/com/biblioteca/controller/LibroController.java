package com.biblioteca.controller;

import com.biblioteca.dto.LibroDTO;
import com.biblioteca.service.LibroService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/libros")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class LibroController {

    private final LibroService libroService;

    // GET /api/libros
    @GetMapping
    public ResponseEntity<List<LibroDTO.Response>> listarTodos() {
        return ResponseEntity.ok(libroService.listarTodos());
    }

    // GET /api/libros/{id}
    @GetMapping("/{id}")
    public ResponseEntity<LibroDTO.Response> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(libroService.obtenerPorId(id));
    }

    // GET /api/libros/autor/{autorId}  -> relación 1:M
    @GetMapping("/autor/{autorId}")
    public ResponseEntity<List<LibroDTO.Response>> listarPorAutor(@PathVariable Long autorId) {
        return ResponseEntity.ok(libroService.listarPorAutor(autorId));
    }

    // POST /api/libros
    @PostMapping
    public ResponseEntity<LibroDTO.Response> crear(@Valid @RequestBody LibroDTO.Request request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(libroService.crear(request));
    }

    // PUT /api/libros/{id}
    @PutMapping("/{id}")
    public ResponseEntity<LibroDTO.Response> actualizar(
            @PathVariable Long id,
            @Valid @RequestBody LibroDTO.Request request) {
        return ResponseEntity.ok(libroService.actualizar(id, request));
    }

    // DELETE /api/libros/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        libroService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
