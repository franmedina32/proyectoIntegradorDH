package com.example.backendPIG6.dto.valoraciones;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RetornoPromedioDTO {
    private Double promedio;
    private Integer cantidadValoraciones;
}