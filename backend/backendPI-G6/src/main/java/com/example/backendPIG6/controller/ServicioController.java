package com.example.backendPIG6.controller;

import com.example.backendPIG6.dto.edicionListasTallerDTO.EliminarPoliticaDTO;
import com.example.backendPIG6.dto.edicionListasTallerDTO.EliminarServicioDTO;
import com.example.backendPIG6.service.ServiciosService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/servicios")
@CrossOrigin("*")
public class ServicioController {
    private ServiciosService serviciosService;

    public ServicioController(ServiciosService serviciosService) {
        this.serviciosService = serviciosService;
    }
    @DeleteMapping("/admin/delete")
    public ResponseEntity<String> deleteService(@RequestBody EliminarServicioDTO esDTO) throws Exception {
        return ResponseEntity.ok(serviciosService.eliminarServicio(esDTO));
    }
}
