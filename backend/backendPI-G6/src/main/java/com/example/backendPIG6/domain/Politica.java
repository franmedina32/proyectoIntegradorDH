package com.example.backendPIG6.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "politicas")
@Getter
@Setter
@NoArgsConstructor
public class Politica {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    @NotNull
    private String descripcionPolitica;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "taller_id")
    @JsonIgnore
    private Taller taller;

    public Politica(String descripcionPolitica) {
        this.descripcionPolitica = descripcionPolitica;
    }
}
