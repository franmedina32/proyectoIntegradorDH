package com.example.backendPIG6.repository;

import com.example.backendPIG6.domain.Reserva;
import jakarta.persistence.OrderBy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Long> {

    List<Reserva> findByUsuarioId(Long id);
    @OrderBy("fecha DESC")
    List<Reserva> findByUsuarioEmailOrderByFechaDesc(String email);

    @Query("SELECT r FROM Reserva r WHERE r.taller.id = :tallerId AND r.fecha = :fecha")
    List<Reserva> findAllByTallerIdAndFecha(@Param("tallerId") Long tallerId, @Param("fecha") LocalDateTime fecha);
}
