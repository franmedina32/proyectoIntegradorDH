package com.example.backendPIG6.dto.comentarios;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ComentarioDTO {
    private String textoComentario;
    private String emailUsuario;
    private Long tallerId;


}
