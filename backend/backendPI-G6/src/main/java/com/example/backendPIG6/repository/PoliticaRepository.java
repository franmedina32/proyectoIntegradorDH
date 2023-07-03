package com.example.backendPIG6.repository;

import com.example.backendPIG6.domain.Politica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PoliticaRepository extends JpaRepository<Politica,Long> {
}
