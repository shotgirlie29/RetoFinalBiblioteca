package com.biblioteca.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

public class LibroDTO {

    @Data @NoArgsConstructor @AllArgsConstructor
    public static class Response {
        private Long id;
        private String titulo;
        private String genero;
        private Integer anioPublicacion;
        private Double precio;
        private Long autorId;
        private String autorNombre;
    }

    @Data @NoArgsConstructor @AllArgsConstructor
    public static class Request {
        @NotBlank(message = "El título es obligatorio")
        @Size(min = 1, max = 200)
        private String titulo;

        @NotBlank(message = "El género es obligatorio")
        private String genero;

        @NotNull(message = "El año de publicación es obligatorio")
        @Min(value = 1000, message = "Año no válido")
        @Max(value = 2100, message = "Año no válido")
        private Integer anioPublicacion;

        @DecimalMin(value = "0.0", message = "El precio no puede ser negativo")
        private Double precio;

        @NotNull(message = "El autor es obligatorio")
        private Long autorId;
    }
}
