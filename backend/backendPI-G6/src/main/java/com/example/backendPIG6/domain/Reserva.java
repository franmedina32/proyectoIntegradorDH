package com.example.backendPIG6.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "reservas")
public class Reserva {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "usuario_id",nullable = false)
    private Usuario usuario;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "vehiculo_id",nullable = false)
    private Vehiculo vehiculo;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "taller_id",nullable = false)
    private Taller taller;

    @Column
    @NotNull
    private LocalDateTime fecha;

    public Reserva() {
    }

    public Reserva(Usuario usuario, Vehiculo vehiculo, Taller taller, LocalDateTime fecha) {
        this.usuario = usuario;
        this.vehiculo = vehiculo;
        this.taller = taller;
        this.fecha = fecha;
    }

    public Reserva(Long id, Usuario usuario, Vehiculo vehiculo, Taller taller, LocalDateTime fecha) {
        this.id = id;
        this.usuario = usuario;
        this.vehiculo = vehiculo;
        this.taller = taller;
        this.fecha = fecha;
    }
}
