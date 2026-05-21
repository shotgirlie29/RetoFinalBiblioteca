package com.biblioteca.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

// DTO de respuesta para Autor (sin lista de libros, para listados)
public class AutorDTO {

    @Data @NoArgsConstructor @AllArgsConstructor
    public static class Response {
        private Long id;
        private String nombre;
        private String nacionalidad;
        private String biografia;
        private int totalLibros;
    }

    @Data @NoArgsConstructor @AllArgsConstructor
    public static class ResponseConLibros {
        private Long id;
        private String nombre;
        private String nacionalidad;
        private String biografia;
        private List<LibroDTO.Response> libros;
    }

    @Data @NoArgsConstructor @AllArgsConstructor
    public static class Request {
        @NotBlank(message = "El nombre es obligatorio")
        @Size(min = 2, max = 100)
        private String nombre;

        @NotBlank(message = "La nacionalidad es obligatoria")
        private String nacionalidad;

        @Size(max = 500)
        private String biografia;
    }
}
