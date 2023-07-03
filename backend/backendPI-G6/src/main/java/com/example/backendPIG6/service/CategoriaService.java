package com.example.backendPIG6.service;

import com.example.backendPIG6.domain.Categoria;
import com.example.backendPIG6.dto.RegistroCategoriaDTO;
import com.example.backendPIG6.exceptions.BadRequestException;
import com.example.backendPIG6.exceptions.ResourceNotFoundException;
import com.example.backendPIG6.repository.CategoriaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoriaService {
    private CategoriaRepository categoriaRepository;

    public CategoriaService(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    public Categoria DTOtoCAT(RegistroCategoriaDTO rcDTO) {
        return new Categoria(rcDTO.getTitulo(), rcDTO.getUrlImg(), rcDTO.getDescripcion());
    }

    public Categoria crearCategoria(RegistroCategoriaDTO rcDTO) throws Exception{
        try {
            return categoriaRepository.save(DTOtoCAT(rcDTO));
        }
        catch (Exception e){
            e.printStackTrace();
            throw new BadRequestException("NO SE PUDO REGISTRAR LA CATEGORIA");
        }
    }

    public List<Categoria> listarCategorias() throws Exception {
        try {
            return categoriaRepository.findAll();
        }
        catch (Exception e){
            e.printStackTrace();
            throw new ResourceNotFoundException("NO SE PUDO LISTAR LAS CATEGORIAS");
        }
    }

    public String eliminarCategoria(Long id) throws Exception {
        try {
            Optional<Categoria> catBusq = categoriaRepository.findById(id);
            if (catBusq.isPresent()){
                categoriaRepository.delete(catBusq.get());
                return "SE ELIMINO LA CATEGORIA : " + catBusq.get().getTitulo();
            }
            else {
                throw new ResourceNotFoundException("ERROR: NO SE PUEDE ELIMINAR LA CATEGORIA PORQUE NO SE ENCUENTRA EN LA BASE DE DATOS");
            }
        }
        catch (Exception e){
            e.printStackTrace();
            throw new BadRequestException("ERROR : NO SE PUDO ELIMINAR LA CATEGORIA");
        }
    }

    public Page<Categoria> paginarCategorias(Integer page) throws Exception {
        final Pageable pageable = PageRequest.of(page,5);
        try {
            return categoriaRepository.findAll(pageable);
        }
        catch (Exception e){
            e.printStackTrace();
            throw new BadRequestException("ERROR: NO SE PUDO PAGINAR LAS CATEGORIAS");
        }
    }


}
