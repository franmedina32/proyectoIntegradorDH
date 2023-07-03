package com.example.backendPIG6.service;

import com.example.backendPIG6.domain.Servicio;
import com.example.backendPIG6.dto.edicionListasTallerDTO.EliminarServicioDTO;
import com.example.backendPIG6.exceptions.BadRequestException;
import com.example.backendPIG6.exceptions.ResourceNotFoundException;
import com.example.backendPIG6.repository.ServicioRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ServiciosService {
    private final ServicioRepository servicioRepository;

    public ServiciosService(ServicioRepository servicioRepository) {
        this.servicioRepository = servicioRepository;
    }

    public String eliminarServicio(EliminarServicioDTO esDTO) throws Exception {
        try{
            Optional<Servicio> ser = servicioRepository.findById(esDTO.getServicioId());
            if (ser.isPresent()){
                servicioRepository.delete(ser.get());
                return "SE ELIMINO EL SERVICIO CON ID: " + esDTO.getServicioId() + " CON EXITO";
            }
            else {
                throw new ResourceNotFoundException("ERROR: NO SE PUEDE ELIMINAR EL SERVICIO PORQUE NO SE ENCONTRO EN LA BASE DE DATOS");
            }
        }
        catch (Exception e){
            e.printStackTrace();
            throw new BadRequestException("ERROR: NO SE PUEDE ELIMINAR EL SERVICIO");
        }
    }
}
