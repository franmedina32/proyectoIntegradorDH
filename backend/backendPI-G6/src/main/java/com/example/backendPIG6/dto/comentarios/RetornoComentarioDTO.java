package com.example.backendPIG6.dto.comentarios;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RetornoComentarioDTO {
    private String usuarioNombre;
    private String usuarioApellido;
    private String textoComentario;
}
