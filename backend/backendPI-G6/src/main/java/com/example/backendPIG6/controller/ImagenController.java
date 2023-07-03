package com.example.backendPIG6.controller;

import com.example.backendPIG6.dto.edicionListasTallerDTO.EliminarPoliticaDTO;
import com.example.backendPIG6.dto.edicionListasTallerDTO.EliminarUrlDTO;
import com.example.backendPIG6.service.ImagenService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/imagenes")
@CrossOrigin("*")
public class ImagenController {
    private ImagenService imagenService;

    public ImagenController(ImagenService imagenService) {
        this.imagenService = imagenService;
    }

    @DeleteMapping("/admin/delete")
    public ResponseEntity<String> deleteImage(@RequestBody EliminarUrlDTO euDTO) throws Exception {
        return ResponseEntity.ok(imagenService.eliminarImagen(euDTO));
    }
}
