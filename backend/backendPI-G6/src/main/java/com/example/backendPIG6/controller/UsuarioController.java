package com.example.backendPIG6.controller;

import com.example.backendPIG6.domain.Usuario;
import com.example.backendPIG6.security.AuthUsuarioDTO;
import com.example.backendPIG6.security.AuthenticationResponse;
import com.example.backendPIG6.security.RegistroUsuarioDTO;
import com.example.backendPIG6.service.EmailService;
import com.example.backendPIG6.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuario")
@CrossOrigin("*")
public class UsuarioController {

    private UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthenticationResponse> registroUsuario(@RequestBody RegistroUsuarioDTO request) throws Exception{
        return ResponseEntity.ok(usuarioService.registro(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authUsuario(@RequestBody AuthUsuarioDTO request) throws Exception{
        return ResponseEntity.ok(usuarioService.autenticar(request));
    }
    @GetMapping("/listar")
    public ResponseEntity<List<Usuario>> listarUsuarios(){
        return ResponseEntity.ok(usuarioService.buscarUsuarios());
    }

    @DeleteMapping("/eliminar/nombre")
    public ResponseEntity<Usuario> eliminarUsuario(@RequestBody RegistroUsuarioDTO registroUsuarioDTO) throws Exception{
        return ResponseEntity.ok(usuarioService.eliminarUsuario(registroUsuarioDTO));
    }

    @DeleteMapping("/eliminar/id/{id}")
    public ResponseEntity<Usuario> eliminarUsuarioId(@PathVariable Long id) throws Exception {
        return ResponseEntity.ok(usuarioService.eliminarUsuarioId(id));
    }
}
