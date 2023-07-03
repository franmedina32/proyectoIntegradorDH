package com.example.backendPIG6.controller;

import com.example.backendPIG6.domain.Favorito;
import com.example.backendPIG6.dto.favoritos.UserTallFavDTO;
import com.example.backendPIG6.dto.favoritos.FavoritosUsuarioDTO;
import com.example.backendPIG6.dto.favoritos.RegistrarFavortioDTO;
import com.example.backendPIG6.service.FavoritoService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/stored/fav")
@CrossOrigin("*")
@AllArgsConstructor
public class FavoritoController {
    private FavoritoService favoritoService;

    @PostMapping("/new")
    public ResponseEntity<Favorito> registrarFavorito(@RequestBody UserTallFavDTO utfDTO) throws Exception {
        return ResponseEntity.ok(favoritoService.registrarFavorito(utfDTO));
    }

    @PostMapping("/list")
    public ResponseEntity<List<Favorito>> listarFavoritosUsuario(@RequestBody FavoritosUsuarioDTO fuDTO) throws Exception {
        return ResponseEntity.ok(favoritoService.listarFavoritosUsuario(fuDTO));
    }

    @DeleteMapping("/id/{id}")
    public ResponseEntity<String> eliminarFavorito(@PathVariable Long id) throws Exception {
        return ResponseEntity.ok(favoritoService.eliminarFavorito(id));
    }

    @DeleteMapping("/del/info")
    public ResponseEntity<String> eliminarFavDtoInfo(@RequestBody UserTallFavDTO utfDto) throws Exception {
        return ResponseEntity.ok(favoritoService.eliminarFavTallUser(utfDto));
    }

    @PostMapping("/check")
    public ResponseEntity<Boolean> checkFav(@RequestBody UserTallFavDTO cfDTO) throws Exception {
        return ResponseEntity.ok(favoritoService.checkTallerUserFav(cfDTO));
    }
}
