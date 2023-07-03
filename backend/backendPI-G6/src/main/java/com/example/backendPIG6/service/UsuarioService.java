package com.example.backendPIG6.service;

import com.example.backendPIG6.config.JwtService;
import com.example.backendPIG6.domain.Rol;
import com.example.backendPIG6.domain.Usuario;
import com.example.backendPIG6.security.AuthUsuarioDTO;
import com.example.backendPIG6.security.AuthenticationResponse;
import com.example.backendPIG6.security.RegistroUsuarioDTO;
import com.example.backendPIG6.exceptions.BadRequestException;
import com.example.backendPIG6.exceptions.ResourceNotFoundException;
import com.example.backendPIG6.repository.UsuarioRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;

    public UsuarioService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager, EmailService emailService) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.emailService = emailService;
    }

    public AuthenticationResponse registro(RegistroUsuarioDTO request) throws Exception{
        try{
            Usuario usRegistro = new Usuario(request.getNombre(), request.getApellido(), passwordEncoder.encode(request.getPassword()), request.getEmail(), request.getCelular(),request.getDni());
            usRegistro.setRol(Rol.USER);
            usuarioRepository.save(usRegistro);
            emailService.sendMail(request.getEmail(), "REGISTRO TECNIAUTOS", "Bienvenido/a a TecniAutos, su usuario fue registrado con exito");
            String jwtToken = jwtService.generateToken(usRegistro);
            return AuthenticationResponse.builder()
                    .token(jwtToken)
                    .build();
        }
        catch (Exception e){
            e.printStackTrace();
            throw new BadRequestException("ERROR: NO SE PUDO REGISTRAR EL USUARIO");
        }
    }

    public AuthenticationResponse autenticar(AuthUsuarioDTO request) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
            var usuarioBus = usuarioRepository.findByEmail(request.getEmail()).get();
            String jwtToken = jwtService.generateToken(usuarioBus);
            return AuthenticationResponse.builder()
                    .token(jwtToken)
                    .build();
        }
        catch(Exception e){
                e.printStackTrace();
                throw new BadRequestException("ERROR: NO SE PUDO INGRESAR CON LAS CREDENCIALES");
            }
        }

    public List<Usuario> buscarUsuarios(){
        return usuarioRepository.findAll();
    }

    public Usuario eliminarUsuario(RegistroUsuarioDTO registroUsuarioDTO) throws Exception {
        Optional<Usuario> usuarioBusquedad = usuarioRepository.findByNombre(registroUsuarioDTO.getNombre());
        try {
            if (usuarioBusquedad.isPresent()){
                usuarioRepository.delete(usuarioBusquedad.get());
            }
            else {
                throw new ResourceNotFoundException("ERROR: NO SE PUEDE ELIMINAR EL USUARIO " + registroUsuarioDTO.getNombre() + " PORQUE NO SE ENCUENTRA EN LA BASE DE DATOS");
            }
        }
        catch (Exception e){
            e.printStackTrace();
            throw new BadRequestException("ERROR: NO SE PUDO EJECUTAR LA ELIMINACION DEL USUARIO");
        }
        return usuarioBusquedad.get();
    }

    public Usuario eliminarUsuarioId(Long id) throws Exception {
        Optional<Usuario> usElim = usuarioRepository.findById(id);
        try{
            if (usElim.isPresent()){
                usuarioRepository.delete(usElim.get());
            }
            else {
                throw new ResourceNotFoundException("ERROR: NO SE PUDO ELIMINAR EL USUARIO PORQUE NO SE LO ENONTRO EN LA BASE DE DATOS");
            }
        }
        catch (Exception e){
            e.printStackTrace();
            throw new BadRequestException("ERROR: NO SE PUDO EJECUTAR LA ELIMINACION DEL USUARIO");
        }
        return usElim.get();
    }

}
