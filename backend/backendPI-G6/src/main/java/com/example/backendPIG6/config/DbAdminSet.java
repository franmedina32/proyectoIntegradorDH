package com.example.backendPIG6.config;

import com.example.backendPIG6.domain.Rol;
import com.example.backendPIG6.domain.Usuario;
import com.example.backendPIG6.repository.UsuarioRepository;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
@AllArgsConstructor
public class DbAdminSet implements CommandLineRunner {
    private final PasswordEncoder passwordEncoder;
    private final UsuarioRepository usuarioRepository;

    public void run(String... args) throws Exception {
        try{
            Optional<Usuario> userAdm = usuarioRepository.findByEmail("admin@example.com");
            if (userAdm.isEmpty()){
                Usuario admin = new Usuario("admin", "admin",passwordEncoder.encode("admin"), "admin@example.com", "admin", "admin");
                admin.setRol(Rol.ADMIN);
                usuarioRepository.save(admin);
            }
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }
}

