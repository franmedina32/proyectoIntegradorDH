package com.example.backendPIG6.service;

import com.example.backendPIG6.domain.Ciudad;
import com.example.backendPIG6.dto.RegistroCiudadDTO;
import com.example.backendPIG6.exceptions.BadRequestException;
import com.example.backendPIG6.exceptions.ResourceNotFoundException;
import com.example.backendPIG6.repository.CiudadRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CiudadService {
    private CiudadRepository ciudadRepository;

    public CiudadService(CiudadRepository ciudadRepository) {
        this.ciudadRepository = ciudadRepository;
    }

    public Ciudad DTOtoCIU(RegistroCiudadDTO ciuDTO) {
        return new Ciudad(ciuDTO.getNombre());
    }

    public Ciudad crearCiudad(RegistroCiudadDTO ciuDTO) throws Exception{
        try {
            return ciudadRepository.save(DTOtoCIU(ciuDTO));
        }
        catch (Exception e){
            e.printStackTrace();
            throw new BadRequestException("NO SE PUDO REGISTRAR LA CIUDAD");
        }
    }

    public List<Ciudad> listarCiudad() throws Exception {
        try {
                return ciudadRepository.findAll();
        }
        catch (Exception e){
            e.printStackTrace();
            throw new ResourceNotFoundException("ERROR: NO SE PUDO LISTAR LAS CIUDAD");
        }
    }

    public String deleteCiudad(Long id) throws Exception {
        try {
            Optional<Ciudad> ciudadDel = ciudadRepository.findById(id);
            if (ciudadDel.isPresent()){
                ciudadRepository.delete(ciudadDel.get());
                return "SE ELIMINO LA CIUDAD: " + ciudadDel.get().getNombre();
            }
            else {
                throw new ResourceNotFoundException("ERROR: NO SE PUDO ELIMINAR LA CIUDAD CON ID: " + id + " PORQUE NO SE ENCUENTRA EN LA BASE DE DATOS");
            }
        }
        catch (Exception e){
            e.printStackTrace();
            throw new BadRequestException("ERROR AL ELIMINAR LA CIUDAD");
        }
    }

    public Page<Ciudad> paginadoCiudad(Integer page) throws Exception {
        final Pageable pageable = PageRequest.of(page,10, Sort.by("id"));
        try {
            return ciudadRepository.findAll(pageable);
        }
        catch (Exception e){
            e.printStackTrace();
            throw new BadRequestException("ERROR NO SE PUDO LISTAR LAS CIUDADES");
        }
    }




}
