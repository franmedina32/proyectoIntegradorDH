package com.example.backendPIG6.controller;

import com.example.backendPIG6.domain.Comentario;
import com.example.backendPIG6.dto.comentarios.ComentarioDTO;
import com.example.backendPIG6.dto.comentarios.RetornoComentarioDTO;
import com.example.backendPIG6.service.ComentarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comentarios")
@CrossOrigin("*")
public class ComentarioController {
    private ComentarioService comentarioService;

    public ComentarioController(ComentarioService comentarioService) {
        this.comentarioService = comentarioService;
    }

    @PostMapping("/registro")
    public ResponseEntity<RetornoComentarioDTO> registrarComentario(@RequestBody ComentarioDTO cDTO) throws Exception {
        return ResponseEntity.ok(comentarioService.registrarComentario(cDTO));
    }

    @GetMapping("/taller/id/{id}")
    public ResponseEntity<List<RetornoComentarioDTO>> listarComentariosTaller(@PathVariable Long id) throws Exception {
        return ResponseEntity.ok(comentarioService.listarComentariosTaler(id));
    }

}
