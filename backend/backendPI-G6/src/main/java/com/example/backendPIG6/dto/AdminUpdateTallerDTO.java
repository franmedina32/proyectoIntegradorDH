package com.example.backendPIG6.dto;

import com.example.backendPIG6.domain.Imagen;
import com.example.backendPIG6.domain.Politica;
import com.example.backendPIG6.domain.Servicio;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;
@Getter
@Setter
public class AdminUpdateTallerDTO {
    private Long id;
    private String nombre;
    private String telefono;
    private String nombreCiudad;
    private String direccion;
    private String urlImgPrincipal;
    private String descripcion;
    private Double latitud;
    private Double longitud;
    private String tituloCategoria;
}
