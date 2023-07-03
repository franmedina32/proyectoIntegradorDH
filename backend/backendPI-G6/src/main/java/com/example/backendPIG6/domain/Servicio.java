package com.example.backendPIG6.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "servicios")
@Getter
@Setter
public class Servicio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    @NotNull
    private String nombreServicio;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "taller_id")
    @JsonIgnore
    private Taller taller;
    public Servicio() {
    }

    public Servicio(String nombreServicio) {
        this.nombreServicio = nombreServicio;
    }

    public Servicio(String nombreServicio, Taller taller) {
        this.nombreServicio = nombreServicio;
        this.taller = taller;
    }
}
