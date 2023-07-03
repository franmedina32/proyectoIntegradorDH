package com.example.backendPIG6.controller;

import com.example.backendPIG6.domain.Categoria;
import com.example.backendPIG6.dto.RegistroCategoriaDTO;
import com.example.backendPIG6.service.CategoriaService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categoria")
@CrossOrigin("*")
public class CategoriaController {
    private CategoriaService categoriaService;

    public CategoriaController(CategoriaService categoriaService) {
        this.categoriaService = categoriaService;
    }

    @PostMapping("/new")
    public ResponseEntity<Categoria> crearCategoria(@RequestBody RegistroCategoriaDTO rcDTO) throws Exception {
        return ResponseEntity.ok(categoriaService.crearCategoria(rcDTO));
    }


    @GetMapping("/listar")
    public ResponseEntity<List<Categoria>> listarCategorias() throws Exception {
        return ResponseEntity.ok(categoriaService.listarCategorias());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> eliminarCategoria(@PathVariable Long id) throws Exception {
        return ResponseEntity.ok(categoriaService.eliminarCategoria(id));
    }

    @GetMapping("/paginado/pag/{page}")
    public ResponseEntity<Page<Categoria>> paginarCategorias(@PathVariable Integer page) throws Exception {
        return ResponseEntity.ok(categoriaService.paginarCategorias(page));
    }
}
