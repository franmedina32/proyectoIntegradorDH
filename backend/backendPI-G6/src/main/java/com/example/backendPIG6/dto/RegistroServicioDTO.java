package com.example.backendPIG6.dto;


import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import org.hibernate.validator.constraints.Length;

@Getter
public class RegistroServicioDTO {
    @NotEmpty
    @Length(min = 4,max = 35)
    private String nombreServicio;

}
