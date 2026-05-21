package com.biblioteca.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "libros")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Libro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El título es obligatorio")
    @Size(min = 1, max = 200, message = "El título debe tener entre 1 y 200 caracteres")
    @Column(nullable = false)
    private String titulo;

    @NotBlank(message = "El género es obligatorio")
    @Column(nullable = false)
    private String genero;

    @Min(value = 1000, message = "El año debe ser válido")
    @Max(value = 2100, message = "El año debe ser válido")
    @Column(nullable = false)
    private Integer anioPublicacion;

    @DecimalMin(value = "0.0", message = "El precio no puede ser negativo")
    private Double precio;

    // Relación M:1 -> muchos libros pertenecen a un autor
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "autor_id", nullable = false)
    private Autor autor;
}
