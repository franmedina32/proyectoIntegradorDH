package com.example.backendPIG6.domain;

import com.example.backendPIG6.repository.ValoracionRepository;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.engine.internal.Cascade;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "talleres")
@AllArgsConstructor
@NoArgsConstructor
public class Taller {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    @NotNull
    private String nombre;
    @Column
    @NotNull
    private String telefono;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "ciudad_id")
    private Ciudad ciudad;

    @Column
    @NotNull
    private String direccion;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "ubicacion_id", referencedColumnName = "id")
    private Ubicacion ubicacion;
    @Column
    private String urlImgPrincipal;
    @OneToMany(mappedBy = "taller", cascade = CascadeType.ALL)
    private Set<Imagen> imgs;
    @Column
    @NotNull
    private String descripcion;

    @OneToMany(mappedBy = "taller", cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Valoracion> valoraciones;
    @OneToMany(mappedBy = "taller", cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Comentario> comentarios;

    @OneToMany(mappedBy = "taller", cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Reserva> reservas;

    @OneToMany(mappedBy = "taller", cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Favorito> favoritos;

    @OneToMany(mappedBy = "taller", cascade = CascadeType.ALL)
    private Set<Servicio> servicios;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "categoria_id")
    private Categoria categoria;

    @OneToMany(mappedBy = "taller", cascade = CascadeType.ALL)
    private Set<Politica> politicas;


    public void addImg(Imagen i){imgs.add(i);}
    public void addServicio(Servicio s){servicios.add(s);}
    public void  addReserva(Reserva r){
        reservas.add(r);
    }
    public void addValoracion(Valoracion v) {valoraciones.add(v);}
    public void addPolitica(Politica p){politicas.add(p);}
    public Double promedio() {
        if (valoraciones.isEmpty()){
            return 0.0;
        }
        else {
            Double suma = 0.0;
            Double valSize = 0.0;
            for (Valoracion valoracion:valoraciones) {
                suma += valoracion.getPuntos();
                valSize += 1.0;
            }
            return suma / valSize;
        }
    }
    public Integer cantidadValoraciones(){
        return valoraciones.size();
    }
    public Taller(String nombre, String telefono, Ciudad ciudad, String direccion, String urlImgPrincipal, String descripcion, Categoria categoria) {
        this.nombre = nombre;
        this.telefono = telefono;
        this.ciudad = ciudad;
        this.direccion = direccion;
        this.urlImgPrincipal = urlImgPrincipal;
        this.descripcion = descripcion;
        this.categoria = categoria;
    }
    public Taller(String nombre, String telefono, Ciudad ciudad, String direccion, Ubicacion ubicacion , String urlImgPrincipal, String descripcion, Categoria categoria) {
        this.nombre = nombre;
        this.telefono = telefono;
        this.ciudad = ciudad;
        this.direccion = direccion;
        this.ubicacion = ubicacion;
        this.urlImgPrincipal = urlImgPrincipal;
        this.descripcion = descripcion;
        this.categoria = categoria;
    }
}
