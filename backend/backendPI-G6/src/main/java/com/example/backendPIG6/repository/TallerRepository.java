package com.example.backendPIG6.repository;

import com.example.backendPIG6.domain.Taller;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface TallerRepository extends JpaRepository<Taller,Long> {
    Optional<Taller> findByNombre(String nombre);
    Optional<Taller> findById(Long id);

    Set<Taller> findAllByCiudadNombre(String ciudad);


}
