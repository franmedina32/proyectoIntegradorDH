package com.example.backendPIG6.service;

import com.example.backendPIG6.domain.Imagen;
import com.example.backendPIG6.domain.Politica;
import com.example.backendPIG6.dto.edicionListasTallerDTO.EliminarPoliticaDTO;
import com.example.backendPIG6.dto.edicionListasTallerDTO.EliminarUrlDTO;
import com.example.backendPIG6.exceptions.BadRequestException;
import com.example.backendPIG6.exceptions.ResourceNotFoundException;
import com.example.backendPIG6.repository.ImagenRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ImagenService {
    private final ImagenRepository imagenRepository;

    public ImagenService(ImagenRepository imagenRepository) {
        this.imagenRepository = imagenRepository;
    }

    public String eliminarImagen(EliminarUrlDTO euDTO) throws Exception {
        try{
            Optional<Imagen> img = imagenRepository.findById(euDTO.getImagenId());
            if (img.isPresent()){
                imagenRepository.delete(img.get());
                return "SE ELIMINO LA IMAGEN CON ID: " + euDTO.getImagenId() + " CON EXITO";
            }
            else {
                throw new ResourceNotFoundException("ERROR: NO SE PUEDE ELIMINAR LA IMAGEN PORQUE NO SE ENCONTRO EN LA BASE DE DATOS");
            }
        }
        catch (Exception e){
            e.printStackTrace();
            throw new BadRequestException("ERROR: NO SE PUEDE ELIMINAR LA IMAGEN");
        }
    }
}
