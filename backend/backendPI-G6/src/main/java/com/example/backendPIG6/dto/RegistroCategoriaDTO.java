package com.example.backendPIG6.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@Getter
@Setter
public class RegistroCategoriaDTO {
    @NotEmpty
    @Length(min = 4,max = 25)
    private String titulo;
    @NotEmpty
    @Length(min = 4,max = 50)
    private String urlImg;
    @NotEmpty
    @Length(min = 4,max = 250)
    private String descripcion;

    public RegistroCategoriaDTO(String titulo, String urlImg, String descripcion) {
        this.titulo = titulo;
        this.urlImg = urlImg;
        this.descripcion = descripcion;
    }
}

