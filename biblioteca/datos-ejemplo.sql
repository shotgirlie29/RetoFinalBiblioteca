-- ============================================
-- Script SQL de datos de ejemplo
-- BibliotecaApp — Autor -> Libros (1:M)
-- ============================================
-- Uso: Pegar en la consola H2 (http://localhost:8080/h2-console)
-- NOTA: Los datos ya se insertan automáticamente al arrancar via DataInitializer.java
--       Este script es solo para referencia o recarga manual.

-- Limpiar tablas (respetando FK)
DELETE FROM LIBROS;
DELETE FROM AUTORES;

-- Insertar autores
INSERT INTO AUTORES (id, nombre, nacionalidad, biografia) VALUES
(1, 'Gabriel García Márquez', 'Colombiana',
 'Premio Nobel de Literatura 1982. Máximo representante del realismo mágico latinoamericano.'),
(2, 'Jorge Luis Borges', 'Argentina',
 'Escritor argentino, uno de los más importantes de la literatura en español del siglo XX.'),
(3, 'Ana María Matute', 'Española',
 'Premio Cervantes 2010. Escritora española de la generación de posguerra, conocida por su prosa poética.');

-- Insertar libros (autor_id referencia la FK)
INSERT INTO LIBROS (id, titulo, genero, anio_publicacion, precio, autor_id) VALUES
(1,  'Cien años de soledad',                  'Realismo Mágico', 1967, 12.99, 1),
(2,  'El amor en los tiempos del cólera',     'Romance',         1985, 11.50, 1),
(3,  'Crónica de una muerte anunciada',       'Novela',          1981,  9.99, 1),
(4,  'Ficciones',                             'Cuentos',         1944, 10.99, 2),
(5,  'El Aleph',                              'Cuentos',         1949, 10.50, 2),
(6,  'Laberintos',                            'Ensayo',          1962, 13.00, 2),
(7,  'Los hijos muertos',                     'Novela',          1958,  8.99, 3),
(8,  'Primera memoria',                       'Novela',          1960,  9.50, 3);

-- Verificar
SELECT a.nombre AS autor, COUNT(l.id) AS total_libros
FROM AUTORES a
LEFT JOIN LIBROS l ON l.autor_id = a.id
GROUP BY a.id, a.nombre;
