package com.example.backendPIG6.dto.reservas;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class RegistroReservaDTO {
    private String modelo;
    private String marca;
    private String placa;
    private String anio;
    private String cilindraje;
    private Long taller_id;
    private String user_email;
    private LocalDateTime fecha;
}
