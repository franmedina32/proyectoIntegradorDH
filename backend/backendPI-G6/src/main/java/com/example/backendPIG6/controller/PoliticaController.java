package com.example.backendPIG6.controller;

import com.example.backendPIG6.dto.edicionListasTallerDTO.EliminarPoliticaDTO;
import com.example.backendPIG6.service.PoliticasService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/politicas")
@CrossOrigin("*")
public class PoliticaController {
    private PoliticasService politicasService;

    public PoliticaController(PoliticasService politicasService) {
        this.politicasService = politicasService;
    }

    @DeleteMapping("/admin/delete")
    public ResponseEntity<String> deletePolicy(@RequestBody EliminarPoliticaDTO epDTO) throws Exception {
        return ResponseEntity.ok(politicasService.eliminarPolitica(epDTO));
    }
}
