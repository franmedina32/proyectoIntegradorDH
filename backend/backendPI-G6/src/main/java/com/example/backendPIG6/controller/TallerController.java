package com.example.backendPIG6.controller;

import com.example.backendPIG6.domain.Taller;
import com.example.backendPIG6.dto.AdminUpdateTallerDTO;
import com.example.backendPIG6.dto.EdicionTallerDTO;
import com.example.backendPIG6.dto.valoraciones.PuntuarTallerDTO;
import com.example.backendPIG6.dto.RegistroTallerDTO;
import com.example.backendPIG6.dto.edicionListasTallerDTO.AgregarPoliticaDTO;
import com.example.backendPIG6.dto.edicionListasTallerDTO.AgregarServicioDTO;
import com.example.backendPIG6.dto.edicionListasTallerDTO.AgregarUrlDTO;
import com.example.backendPIG6.dto.reservas.BuscarTallerFechaDTO;
import com.example.backendPIG6.dto.valoraciones.RetornoPromedioDTO;
import com.example.backendPIG6.service.TallerService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/taller")
@CrossOrigin("*")
public class TallerController {
    private TallerService tallerService;

    public TallerController(TallerService tallerService) {
        this.tallerService = tallerService;
    }

    @PostMapping("/crear")
    public ResponseEntity<Taller> crearTaller(@RequestBody RegistroTallerDTO rtDTO) throws Exception {
        return ResponseEntity.ok(tallerService.registroTaller(rtDTO));
    }

    @PutMapping("/editar")
    public ResponseEntity<Taller> editarTaller(@RequestBody EdicionTallerDTO etDTO) throws Exception {
        return ResponseEntity.ok(tallerService.edicionTaller(etDTO));
    }

    @GetMapping("/nombre/{nombreTaller}")
    public ResponseEntity<Taller> buscarTallerNombre(@PathVariable String nombreTaller) throws Exception {
        return ResponseEntity.ok(tallerService.buscarTallerNombre(nombreTaller));
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<Taller> buscarTallerId(@PathVariable Long id) throws Exception {
        return ResponseEntity.ok(tallerService.buscarTallerId(id));
    }

    @GetMapping("/categoria/{nombreCategoria}")
    public ResponseEntity<Set<Taller>> filtrarPorCategoria(@PathVariable String nombreCategoria) throws Exception {
        return ResponseEntity.ok(tallerService.filtrarPorCategoria(nombreCategoria));
    }

    @GetMapping("/ciudad/{nombreCiudad}")
    public ResponseEntity<Set<Taller>> filtrarPorCiudad(@PathVariable String nombreCiudad) throws Exception {
        return ResponseEntity.ok(tallerService.filtrarPorCiudad(nombreCiudad));
    }
    @GetMapping("/listar")
    public ResponseEntity<List<Taller>> listarTalleres() throws Exception {
        return ResponseEntity.ok(tallerService.listarTalleres());
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<String> eliminarTaller(@PathVariable Long id) throws Exception {
        return ResponseEntity.ok(tallerService.eliminarTaller(id));
    }

    @GetMapping("/paginado/pag/{page}")
    public ResponseEntity<Page<Taller>> paginadoTalleres(@PathVariable Integer page) throws Exception{
        return ResponseEntity.ok(tallerService.paginadoTalleres(page));
    }

    @PutMapping("/valoraciones")
    public ResponseEntity<String> puntuarTaller(@RequestBody PuntuarTallerDTO ptDTO) throws Exception{
        return ResponseEntity.ok(tallerService.puntuarTaller(ptDTO));
    }

    @GetMapping("/valoracion/id/{id}")
    public ResponseEntity<RetornoPromedioDTO> promedioValoraciones(@PathVariable Long id) throws Exception {
        return ResponseEntity.ok(tallerService.promediarValoraciones(id));
    }

    @PostMapping("/politica/add")
    public ResponseEntity<String> agregarPolitica(@RequestBody AgregarPoliticaDTO apDTO) throws Exception{
        return ResponseEntity.ok(tallerService.agregarPolitca(apDTO));
    }

    @PostMapping("/servicios/add")
    public ResponseEntity<String> agregarServicio(@RequestBody AgregarServicioDTO asDTO) throws Exception {
        return ResponseEntity.ok(tallerService.agregarServicio(asDTO));
    }

    @PostMapping("/imagenes/add")
    public ResponseEntity<String> agregarImagen(@RequestBody AgregarUrlDTO auDTO) throws Exception {
        return ResponseEntity.ok(tallerService.agregarUrl(auDTO));
    }

    @PutMapping("/admin/update")
    public ResponseEntity<Taller> tallerUpdate(@RequestBody AdminUpdateTallerDTO autDTO) throws Exception {
        return ResponseEntity.ok(tallerService.tallerAdminUpdate(autDTO));
    }

    @PostMapping("/search/date")
    public ResponseEntity<Set<Taller>> findByDate(@RequestBody BuscarTallerFechaDTO btfDTO) throws Exception {
        return ResponseEntity.ok(tallerService.buscarTalleresDisponibles(btfDTO));
    }
}
