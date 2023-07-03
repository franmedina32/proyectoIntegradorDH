package com.example.backendPIG6.repository;

import com.example.backendPIG6.domain.Ciudad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CiudadRepository extends JpaRepository<Ciudad,Long> {
    List<Ciudad> findAllByNombreStartingWith(String nombre);

    Optional<Ciudad> findByNombre(String ciudad);
}
