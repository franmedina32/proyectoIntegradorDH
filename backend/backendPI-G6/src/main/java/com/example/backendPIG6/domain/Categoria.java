package com.example.backendPIG6.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Cascade;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "categorias")
@Getter
@Setter
public class Categoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    @NotNull
    private String titulo;
    @Column
    @NotNull
    private String urlImg;
    @Column
    @NotNull
    private String descripcion;

    @OneToMany(mappedBy = "categoria", cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Taller> talleres;

    public Categoria() {
    }

    public Categoria(String titulo, String urlImg, String descripcion) {
        this.titulo = titulo;
        this.urlImg = urlImg;
        this.descripcion = descripcion;
    }

    public Categoria(String titulo, String urlImg, String descripcion, Set<Taller> talleres) {
        this.titulo = titulo;
        this.urlImg = urlImg;
        this.descripcion = descripcion;
        this.talleres = talleres;
    }

    public Categoria(Long id, String titulo, String urlImg, String descripcion, Set<Taller> talleres) {
        this.id = id;
        this.titulo = titulo;
        this.urlImg = urlImg;
        this.descripcion = descripcion;
        this.talleres = talleres;
    }

    public void addTaller(Taller taller){
        talleres.add(taller);
    }
}
