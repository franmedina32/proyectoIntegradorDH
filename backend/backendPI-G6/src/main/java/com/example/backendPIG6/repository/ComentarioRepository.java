package com.example.backendPIG6.repository;

import com.example.backendPIG6.domain.Comentario;
import com.example.backendPIG6.domain.Taller;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ComentarioRepository extends JpaRepository<Comentario, Long> {
    List<Comentario> findByTallerId(Long id);
}
