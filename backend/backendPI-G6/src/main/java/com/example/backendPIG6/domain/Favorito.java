package com.example.backendPIG6.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "favoritos")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Favorito {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "taller_id",nullable = false)
    private Taller taller;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "usuario_id",nullable = false)
    private Usuario usuario;

    public Favorito(Taller taller, Usuario usuario) {
        this.taller = taller;
        this.usuario = usuario;
    }
}
