package com.biblioteca.controller;

import com.biblioteca.dto.AutorDTO;
import com.biblioteca.service.AutorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/autores")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class AutorController {

    private final AutorService autorService;

    // GET /api/autores
    @GetMapping
    public ResponseEntity<List<AutorDTO.Response>> listarTodos() {
        return ResponseEntity.ok(autorService.listarTodos());
    }

    // GET /api/autores/{id}
    @GetMapping("/{id}")
    public ResponseEntity<AutorDTO.ResponseConLibros> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(autorService.obtenerPorId(id));
    }

    // POST /api/autores
    @PostMapping
    public ResponseEntity<AutorDTO.Response> crear(@Valid @RequestBody AutorDTO.Request request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(autorService.crear(request));
    }

    // PUT /api/autores/{id}
    @PutMapping("/{id}")
    public ResponseEntity<AutorDTO.Response> actualizar(
            @PathVariable Long id,
            @Valid @RequestBody AutorDTO.Request request) {
        return ResponseEntity.ok(autorService.actualizar(id, request));
    }

    // DELETE /api/autores/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        autorService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
