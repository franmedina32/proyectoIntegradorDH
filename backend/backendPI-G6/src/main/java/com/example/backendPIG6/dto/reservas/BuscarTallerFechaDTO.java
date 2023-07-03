package com.example.backendPIG6.dto.reservas;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class BuscarTallerFechaDTO {
    private LocalDateTime fecha;
    private String nombreCiudad;
}
