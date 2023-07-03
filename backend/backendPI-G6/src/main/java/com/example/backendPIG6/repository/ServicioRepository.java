package com.example.backendPIG6.repository;

import com.example.backendPIG6.domain.Servicio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface ServicioRepository extends JpaRepository<Servicio,Long> {
    Optional<Servicio> findByNombreServicio(String nombreServicio);
}
