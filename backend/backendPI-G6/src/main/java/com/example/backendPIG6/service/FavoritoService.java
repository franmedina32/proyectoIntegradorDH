package com.example.backendPIG6.service;

import com.example.backendPIG6.domain.Favorito;
import com.example.backendPIG6.domain.Taller;
import com.example.backendPIG6.domain.Usuario;
import com.example.backendPIG6.dto.favoritos.UserTallFavDTO;
import com.example.backendPIG6.dto.favoritos.FavoritosUsuarioDTO;
import com.example.backendPIG6.dto.favoritos.RegistrarFavortioDTO;
import com.example.backendPIG6.exceptions.BadRequestException;
import com.example.backendPIG6.exceptions.ResourceNotFoundException;
import com.example.backendPIG6.repository.FavoritoRepository;
import com.example.backendPIG6.repository.TallerRepository;
import com.example.backendPIG6.repository.UsuarioRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class FavoritoService {
    private final FavoritoRepository favoritoRepository;
    private final UsuarioRepository usuarioRepository;
    private final TallerRepository tallerRepository;

    public Favorito registrarFavorito(UserTallFavDTO utfDTO) throws Exception {
        try{
            Optional<Usuario> userFav = usuarioRepository.findByEmail(utfDTO.getUserEmail());
            Optional<Taller> tallerFav = tallerRepository.findById(utfDTO.getTallerId());
            if (userFav.isEmpty() || tallerFav.isEmpty()){
                throw new  BadRequestException("ERROR: NO SE PUEDE REGISTRAR EL FAVORITO PORQUE EL USUARIO O TALLER NO ESTAN REGISTRADOS");
            }
            return favoritoRepository.save(new Favorito(tallerFav.get(), userFav.get()));
        }
        catch (Exception e){
            e.printStackTrace();
            throw new BadRequestException("ERROR: NO SE PUDO REGISTRAR EL FAVORITO");
        }
    }

    public String eliminarFavTallUser(UserTallFavDTO utfDTO) throws Exception {
        try {
            Optional<Usuario> usuarioBusq = usuarioRepository.findByEmail(utfDTO.getUserEmail());
            if (usuarioBusq.isEmpty()){
                throw new ResourceNotFoundException("ERROR: NO SE PUEDE ELIMINAR EL USUARIO PORUQUE NO SE ENCUENTRA REGISTRADO");
            }
            List<Favorito> favoritosUsuario = favoritoRepository.findByUsuarioId(usuarioBusq.get().getId());
            for (Favorito fav: favoritosUsuario) {
                if (fav.getTaller().getId() == utfDTO.getTallerId()){
                    favoritoRepository.delete(fav);
                    return "SE ELIMINO EL FAVORITO CON ID: " + fav.getId() + " TALLER: " + fav.getTaller().getNombre() + " USUARIO: " + fav.getUsuario().getEmail();
                }
            }
            return "NO SE PUDO ELMINAR EL FAVORITO PORQUE LOS DATOS NO COINCIDEN";
        }
        catch (Exception e){
            e.printStackTrace();
            throw new ResourceNotFoundException("ERROR: NO SE PUDO ELIMINAR EL FAVORITO PORQUE EL MISMO NO EXISTE");
        }
    }

    public List<Favorito> listarFavoritosUsuario(FavoritosUsuarioDTO fuDTO) throws Exception {
        try {
            Optional<Usuario> usuarioBusq = usuarioRepository.findByEmail(fuDTO.getEmail());
            if (usuarioBusq.isEmpty()){
                throw new ResourceNotFoundException("ERROR: NO SE PUDO LISTAR LOS FAVORITOS PORQUE EL USUARIO NO SE ENCUENTRA REGISTRADO");
            }
            return favoritoRepository.findByUsuarioId(usuarioBusq.get().getId());
        }
        catch (Exception e){
            e.printStackTrace();
            throw new BadRequestException("ERROR: NO SE PUDO LISTAR LOS FAVORITOS");
        }
    }

    public String eliminarFavorito(Long id) throws Exception {
        try {
            Optional<Favorito> favoritoBusq = favoritoRepository.findById(id);
            if (favoritoBusq.isEmpty()){
                throw new ResourceNotFoundException("ERROR: NO SE PUEDE ELIMINAR EL FAVORITO PORQUE NO SE ENCUENTRA EN LA BASE DE DATOS");
            }
            favoritoRepository.delete(favoritoBusq.get());
            return "EL FAVORITO " + favoritoBusq.get().getId() + " TALLER: " + favoritoBusq.get().getTaller().getNombre() + " USUARIO: " + favoritoBusq.get().getUsuario().getEmail() + " HA SIDO ELIMINADO CON EXITO";
        }
        catch (Exception e){
            e.printStackTrace();
            throw new BadRequestException("ERROR: NO SE PUDO ELIMINAR EL FAVORITO");
        }
    }

    public Boolean checkTallerUserFav (UserTallFavDTO cfDTO) throws Exception {
        try {
            Optional<Usuario> usuarioBusq = usuarioRepository.findByEmail(cfDTO.getUserEmail());
            if (usuarioBusq.isEmpty()){
                throw new BadRequestException("ERROR: EL USUARIO NO ESTA REGISTRADO");
            }
            List<Favorito> favoritosUsuario = favoritoRepository.findByUsuarioId(usuarioBusq.get().getId());
            for (Favorito fav:favoritosUsuario) {
                if (fav.getTaller().getId() == cfDTO.getTallerId()){
                    return true;
                }
            }
            return false;
        }
        catch (Exception e){
            e.printStackTrace();
            throw new ResourceNotFoundException("ERROR: NO SE PUDO ENCONTRAR EL FAVORITO");
        }
    }
}
