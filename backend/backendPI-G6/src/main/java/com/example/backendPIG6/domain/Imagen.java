package com.example.backendPIG6.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
@Entity
@Table(name = "imagenes")
public class Imagen {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    @NotNull
    private String url;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "taller_id")
    @JsonIgnore
    private Taller taller;

    public Imagen() {
    }

    public Imagen(String url) {
        this.url = url;
    }

    public Imagen(String url, Taller taller) {
        this.url = url;
        this.taller = taller;
    }
}
