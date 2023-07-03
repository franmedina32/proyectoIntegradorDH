package com.example.backendPIG6.controller;

import com.example.backendPIG6.domain.Categoria;
import com.example.backendPIG6.domain.Ciudad;
import com.example.backendPIG6.dto.RegistroCategoriaDTO;
import com.example.backendPIG6.dto.RegistroCiudadDTO;
import com.example.backendPIG6.service.CiudadService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ciudad")
@CrossOrigin("*")
public class CiudadController {
    private CiudadService ciudadService;

    public CiudadController(CiudadService ciudadService) {
        this.ciudadService = ciudadService;
    }

    @PostMapping("/crear")
    public ResponseEntity<Ciudad> crearCiudad(@RequestBody RegistroCiudadDTO ciuDTO) throws Exception {
        return ResponseEntity.ok(ciudadService.crearCiudad(ciuDTO));
    }

    @GetMapping("/listar")
    public ResponseEntity<List<Ciudad>> listarCiudades() throws Exception {
        return ResponseEntity.ok(ciudadService.listarCiudad());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> eliminarCiudad(@PathVariable Long id) throws Exception {
        return ResponseEntity.ok(ciudadService.deleteCiudad(id));
    }

    @GetMapping("/paginado/pag/{page}")
    public ResponseEntity<Page<Ciudad>> paginarCiudades(@PathVariable Integer page) throws Exception{
        return ResponseEntity.ok(ciudadService.paginadoCiudad(page));
    }



}
