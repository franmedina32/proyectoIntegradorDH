package com.example.backendPIG6.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;


    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public class RegistroCiudadDTO {
        @NotEmpty
        @Length(min = 4,max = 25)
        private String nombre;

    }

