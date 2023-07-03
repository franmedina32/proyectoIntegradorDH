package com.example.backendPIG6.domain;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "comentarios")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Comentario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "taller_id",nullable = false)
    private Taller taller;
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "usuario_id",nullable = false)
    private Usuario usuario;
    @Column
    private String textoComentario;

    public Comentario(String textoComentario) {
        this.textoComentario = textoComentario;
    }

    public Comentario(Taller taller, Usuario usuario, String textoComentario) {
        this.taller = taller;
        this.usuario = usuario;
        this.textoComentario = textoComentario;
    }
}
