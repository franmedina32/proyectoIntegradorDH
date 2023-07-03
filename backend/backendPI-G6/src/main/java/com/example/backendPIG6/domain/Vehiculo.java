package com.example.backendPIG6.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "vehiculos")
@NoArgsConstructor
@AllArgsConstructor
public class Vehiculo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    @NotNull
    private String modelo;
    @Column
    @NotNull
    private String marca;
    @Column
    @NotNull
    private String placa;
    @Column
    @NotNull
    private String anio;
    @Column
    @NotNull
    private String cilindraje;

    @Column
    private Boolean activo;

    @OneToMany(mappedBy = "vehiculo", cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Reserva> reservas;


    public Vehiculo(String modelo, String marca, String placa, String anio, String cilindraje, Boolean activo) {
        this.modelo = modelo;
        this.marca = marca;
        this.placa = placa;
        this.anio = anio;
        this.cilindraje = cilindraje;
        this.activo = activo;
    }
}
