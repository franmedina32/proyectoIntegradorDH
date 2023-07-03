package com.example.backendPIG6.controller;

import com.example.backendPIG6.domain.Reserva;
import com.example.backendPIG6.dto.reservas.BuscarReservasUsuarioDTO;
import com.example.backendPIG6.dto.reservas.RegistroReservaDTO;
import com.example.backendPIG6.service.ReservaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reservas")
@CrossOrigin("*")
public class ReservaController {
    private ReservaService reservaService;

    public ReservaController(ReservaService reservaService) {
        this.reservaService = reservaService;
    }

    @PostMapping("/appointment")
    public ResponseEntity<Reserva> registerAppointment(@RequestBody RegistroReservaDTO rrDTO) throws Exception {
        return ResponseEntity.ok(reservaService.registerReserva(rrDTO));
    }

    @PostMapping("/usuario")
    public ResponseEntity<List<Reserva>> buscarReservasUsuario(@RequestBody BuscarReservasUsuarioDTO bruDTO) throws Exception {
        return ResponseEntity.ok(reservaService.buscarReservasUsuario(bruDTO));
    }

    @DeleteMapping("/elim/id/{id}")
    public ResponseEntity<String> eliminarReservaId(@PathVariable Long id) throws Exception {
        return ResponseEntity.ok(reservaService.eliminarReserva(id));
    }
}
