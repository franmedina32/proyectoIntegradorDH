package com.example.backendPIG6.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "valoraciones")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Valoracion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private Double puntos;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "taller_id")
    private Taller taller;

    public Valoracion(Double puntos) {
        this.puntos = puntos;
    }


}
