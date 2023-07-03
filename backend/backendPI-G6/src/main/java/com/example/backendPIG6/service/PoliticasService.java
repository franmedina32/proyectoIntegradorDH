package com.example.backendPIG6.service;

import com.example.backendPIG6.domain.Politica;
import com.example.backendPIG6.dto.edicionListasTallerDTO.EliminarPoliticaDTO;
import com.example.backendPIG6.exceptions.BadRequestException;
import com.example.backendPIG6.exceptions.ResourceNotFoundException;
import com.example.backendPIG6.repository.PoliticaRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PoliticasService {
    private final PoliticaRepository politicaRepository;

    public PoliticasService(PoliticaRepository politicaRepository) {
        this.politicaRepository = politicaRepository;
    }

    public String eliminarPolitica(EliminarPoliticaDTO epDTO) throws Exception {
        try{
            Optional<Politica> pol = politicaRepository.findById(epDTO.getPoliticaId());
            if (pol.isPresent()){
                politicaRepository.delete(pol.get());
                return "SE ELIMINO LA POLITICA CON ID: " + epDTO.getPoliticaId() + " CON EXITO";
            }
            else {
                throw new ResourceNotFoundException("ERROR: NO SE PUEDE ELIMINAR LA POLITICA PORQUE NO SE ENCONTRO EN LA BASE DE DATOS");
            }
        }
        catch (Exception e){
            e.printStackTrace();
            throw new BadRequestException("ERROR: NO SE PUEDE ELIMINAR LA POLITCA");
        }
    }
}
