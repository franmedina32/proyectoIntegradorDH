package com.example.backendPIG6.security;

import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import org.hibernate.validator.constraints.Length;

@Getter
@Setter
@Data
@Builder
public class RegistroUsuarioDTO {
    @NotEmpty
    @Length(min = 4,max = 25)
    private String nombre;
    @NotEmpty
    @Length(min = 4,max = 25)
    private String apellido;
    @NotEmpty
    @Length(min = 4,max = 25)
    private String password;
    @NotEmpty
    @Length(min = 7,max = 25)
    private String email;
    @NotEmpty
    @Length(min = 4,max = 35)
    private String celular;
    @NotEmpty
    @Length(min = 4,max = 35)
    private String dni;

    public RegistroUsuarioDTO() {
    }

    public RegistroUsuarioDTO(String nombre, String apellido, String password, String email, String celular, String dni) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.password = password;
        this.email = email;
        this.celular = celular;
        this.dni = dni;
    }
}
