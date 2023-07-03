package com.example.backendPIG6.service;

import com.example.backendPIG6.domain.Comentario;
import com.example.backendPIG6.domain.Taller;
import com.example.backendPIG6.domain.Usuario;
import com.example.backendPIG6.dto.comentarios.ComentarioDTO;
import com.example.backendPIG6.dto.comentarios.RetornoComentarioDTO;
import com.example.backendPIG6.exceptions.BadRequestException;
import com.example.backendPIG6.exceptions.ResourceNotFoundException;
import com.example.backendPIG6.repository.ComentarioRepository;
import com.example.backendPIG6.repository.TallerRepository;
import com.example.backendPIG6.repository.UsuarioRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ComentarioService {
    private final TallerRepository tallerRepository;
    private final UsuarioRepository usuarioRepository;
    private final ComentarioRepository comentarioRepository;

    public RetornoComentarioDTO registrarComentario(ComentarioDTO comentarioDTO) throws Exception {
        try {
            Optional<Usuario> usuarioBusq = usuarioRepository.findByEmail(comentarioDTO.getEmailUsuario());
            if (usuarioBusq.isEmpty()){
                throw new ResourceNotFoundException("ERROR NO SE PUDO REGISTRAR EL COMENTARIO PORQUE EL USUARIO NO ESTA REGISTRADO");
            }
            Optional<Taller> tallerBusq = tallerRepository.findById(comentarioDTO.getTallerId());
            if (tallerBusq.isEmpty()){
                throw new ResourceNotFoundException("ERROR: NO SE PUDO REGISTRAR EL COMENTARIO PORQUE EL TALLER NO ESTA EN EL SISTEMA");
            }
            Comentario storedComment = comentarioRepository.save(new Comentario(tallerBusq.get(),usuarioBusq.get(), comentarioDTO.getTextoComentario()));
            return new RetornoComentarioDTO(storedComment.getUsuario().getNombre(), storedComment.getUsuario().getApellido(), storedComment.getTextoComentario());
        }
        catch (Exception e){
            e.printStackTrace();
            throw new BadRequestException("ERROR: NO SE PUDO REGISTRAR EL COMENTARIO");
        }
    }

    public List<RetornoComentarioDTO> listarComentariosTaler (Long tallerId) throws Exception {
        try {
            List<Comentario> comentariosTaller = comentarioRepository.findByTallerId(tallerId);
            List<RetornoComentarioDTO> comentariosRet = new ArrayList<>();
            for (Comentario comentario:comentariosTaller) {
                comentariosRet.add(new RetornoComentarioDTO(comentario.getUsuario().getNombre(), comentario.getUsuario().getApellido(), comentario.getTextoComentario()));
            }
            return comentariosRet;
        }
        catch (Exception e){
            e.printStackTrace();
            throw new ResourceNotFoundException("ERROR: NO SE PUDIERON LISTAR LOS COMENTARIOS DEL TALLER");
        }
    }

}
