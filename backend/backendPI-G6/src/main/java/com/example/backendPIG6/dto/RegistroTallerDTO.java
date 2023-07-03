package com.example.backendPIG6.dto;

import com.example.backendPIG6.domain.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Getter
@Setter
public class RegistroTallerDTO {
    @NotEmpty
    @Length(min = 4,max = 25)
    private String nombre;
    @NotEmpty
    @Length(min = 4,max = 25)
    private String telefono;
    @NotEmpty
    @Length(min = 4,max = 25)
    private String ciudad;
    @NotEmpty
    @Length(min = 4,max = 50)
    private String direccion;
    @NotEmpty
    private String imagenPrincipal;
    @NotEmpty
    @Length(min = 4,max = 500)
    private String descripcion;
    private Double latitud;

    private Double longitud;

    @NotEmpty
    private String tituloCategoria;


    private Set<String> politicas;

    private Set<String> urlImgs;

    private Set<String> nombreServicios;

}
