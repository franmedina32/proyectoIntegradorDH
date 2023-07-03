package com.example.backendPIG6.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import java.util.Set;

@Getter
@Setter
public class EdicionTallerDTO {
    @NotEmpty
    @Length(min = 4,max = 25)
    private String nombreTaller;
    private Set<String> imgsUrls;
    private Set<String> nombresServicios;
}
