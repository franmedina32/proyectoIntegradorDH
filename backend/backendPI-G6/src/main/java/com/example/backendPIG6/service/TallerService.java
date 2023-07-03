package com.example.backendPIG6.service;

import com.example.backendPIG6.domain.*;
import com.example.backendPIG6.dto.AdminUpdateTallerDTO;
import com.example.backendPIG6.dto.EdicionTallerDTO;
import com.example.backendPIG6.dto.valoraciones.PuntuarTallerDTO;
import com.example.backendPIG6.dto.RegistroTallerDTO;
import com.example.backendPIG6.dto.edicionListasTallerDTO.AgregarPoliticaDTO;
import com.example.backendPIG6.dto.edicionListasTallerDTO.AgregarServicioDTO;
import com.example.backendPIG6.dto.edicionListasTallerDTO.AgregarUrlDTO;
import com.example.backendPIG6.dto.reservas.BuscarTallerFechaDTO;
import com.example.backendPIG6.dto.valoraciones.RetornoPromedioDTO;
import com.example.backendPIG6.exceptions.BadRequestException;
import com.example.backendPIG6.exceptions.ResourceNotFoundException;
import com.example.backendPIG6.repository.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class TallerService {
    private final TallerRepository tallerRepository;
    private final CategoriaRepository categoriaRepository;

    private final CiudadRepository ciudadRepository;
    private final ImagenRepository imagenRepository;
    private final ServicioRepository servicioRepository;
    private final ValoracionRepository valoracionRepository;
    private final PoliticaRepository politicaRepository;
    private final UbicacionRepository ubicacionRepository;
    private final ReservaRepository reservaRepository;


    public TallerService(TallerRepository tallerRepository, CategoriaRepository categoriaRepository, CiudadRepository ciudadRepository, ImagenRepository imagenRepository, ServicioRepository servicioRepository, ValoracionRepository valoracionRepository, PoliticaRepository politicaRepository, UbicacionRepository ubicacionRepository, ReservaRepository reservaRepository) {
        this.tallerRepository = tallerRepository;
        this.categoriaRepository = categoriaRepository;
        this.ciudadRepository = ciudadRepository;
        this.imagenRepository = imagenRepository;
        this.servicioRepository = servicioRepository;
        this.valoracionRepository = valoracionRepository;
        this.politicaRepository = politicaRepository;
        this.ubicacionRepository = ubicacionRepository;
        this.reservaRepository = reservaRepository;
    }

    public Taller DTOaTaller(RegistroTallerDTO rtDTO) throws BadRequestException {
        try {
            Optional<Ciudad> ciudad = ciudadRepository.findByNombre(rtDTO.getCiudad());
            if (!ciudad.isPresent()) {
                throw new BadRequestException("No existe la ciudad " + rtDTO.getCiudad());
            }
            Optional<Categoria> categoria = categoriaRepository.findByTitulo(rtDTO.getTituloCategoria());
            if (!categoria.isPresent()){
                throw new BadRequestException("NO EXISTE LA CATEGORIA " +rtDTO.getTituloCategoria());
            }
            Taller taller = new Taller(rtDTO.getNombre(), rtDTO.getTelefono(), ciudad.get(),rtDTO.getDireccion(),rtDTO.getImagenPrincipal(), rtDTO.getDescripcion(), categoria.get());
            return taller;
        }
        catch (Exception e){
            e.printStackTrace();
            throw new BadRequestException("ERROR: NO SE PUDO ALMACENAR LA INFORMACION DE EL TALLER");
        }
    }

    public Taller registroTaller(RegistroTallerDTO rtDTO) throws Exception {
        try {
            Taller taller = DTOaTaller(rtDTO);

            if (rtDTO.getLongitud() != null && rtDTO.getLatitud() != null) {
                Ubicacion ubicacion = new Ubicacion(rtDTO.getLatitud(), rtDTO.getLongitud());
                ubicacion.setTaller(taller);
                taller.setUbicacion(ubicacion);
            }

            Taller tallerRet = tallerRepository.save(taller);
            if (rtDTO.getPoliticas() != null) {
                for (String nombrePolitica: rtDTO.getPoliticas()) {
                    Politica newPol = new Politica(nombrePolitica);
                    newPol.setTaller(tallerRet);
                    politicaRepository.save(newPol);
                }
            }
            if (rtDTO.getUrlImgs() != null) {
                for (String url : rtDTO.getUrlImgs()){
                    Imagen newImg = new Imagen(url);
                    newImg.setTaller(tallerRet);
                    imagenRepository.save(newImg);
                }
            }
            if (rtDTO.getNombreServicios() != null) {
                for (String nomSer : rtDTO.getNombreServicios()){
                    Servicio newSer = new Servicio(nomSer);
                    newSer.setTaller(tallerRet);
                    servicioRepository.save(newSer);
                }
            }
            return tallerRet;
        }
        catch (Exception e){
            e.printStackTrace();
            throw new BadRequestException("NO SE PUDO REGISTRAR EL TALLER");
        }
    }

    public Taller edicionTaller(EdicionTallerDTO etDTO) throws Exception {
        Optional<Taller> tallerBusq = tallerRepository.findByNombre(etDTO.getNombreTaller());
        if (tallerBusq.isPresent()){
            //Set<Imagen> imgs = new HashSet<>();
            //Set<Servicio> servicios = new HashSet<>();
            try {
                for (String url: etDTO.getImgsUrls()) {
                    Imagen img = new Imagen(url,tallerBusq.get());
                    imagenRepository.save(img);
                    tallerBusq.get().addImg(img);
                    //imgs.add(img);
                }
                for (String nomSer: etDTO.getNombresServicios()) {
                    Servicio ser = new Servicio(nomSer,tallerBusq.get());
                    servicioRepository.save(ser);
                    tallerBusq.get().addServicio(ser);
                    //servicios.add(ser);
                }
                //tallerBusq.get().setImgs(imgs);
                //tallerBusq.get().setServicios(servicios);
                return tallerRepository.save(tallerBusq.get());
            }
            catch (Exception e){
                e.printStackTrace();
                throw new BadRequestException("ERROR: NO SE PUDO AGREGAR LOS SERVICIOS/IMAGENES AL TALLER");
            }
        }
        else {
            throw new ResourceNotFoundException("ERROR: NO SE PUDE ENCONTRAR EL TALLER");
        }

    }

    public Taller buscarTallerNombre(String nombreTaller) throws Exception {
        Optional<Taller> tallerBusq = tallerRepository.findByNombre(nombreTaller);
        if (tallerBusq.isPresent()){
            return tallerBusq.get();
        }
        else {
            throw new ResourceNotFoundException("ERROR : EL TALLER " + nombreTaller + " NO SE ENCUENTRA EN LA BASE DE DATOS");
        }
    }

    public Taller buscarTallerId(Long id) throws Exception {
        Optional<Taller> tallerBusq = tallerRepository.findById(id);
        if (tallerBusq.isPresent()){
            return tallerBusq.get();
        }
        else {
            throw new ResourceNotFoundException("ERROR : EL TALLER CON ID: " + id + " NO SE ENCUENTRA EN LA BASE DE DATOS");
        }
    }

    public Set<Taller> filtrarPorCategoria(String categoria) throws Exception {
        try {
            List<Taller> talleres = tallerRepository.findAll();
            Set<Taller> talleresFiltrados = new HashSet<>();
            for (Taller tall: talleres) {
                if ((tall.getCategoria().getTitulo()).equals(categoria)){
                    talleresFiltrados.add(tall);
                }
            }
            return talleresFiltrados;
        }
        catch (Exception e){
            e.printStackTrace();
            throw new BadRequestException("NO SE PUDO FILTRAR POR CATEGORIA");
        }
    }

    public Set<Taller> filtrarPorCiudad(String ciudad) throws Exception {
        try {
            Optional<Ciudad> ciudadBusq = ciudadRepository.findByNombre(ciudad);
            if (ciudadBusq.isPresent()){
                return tallerRepository.findAllByCiudadNombre(ciudad);
            }
            else {
                throw new ResourceNotFoundException("ERROR: LA CIUDAD NO SE ENCUENTRA REGISTRADA");
            }
        }
        catch (Exception e){
            e.printStackTrace();
            throw new BadRequestException("ERROR: NO SE PUDO FILTRAR POR CIUDAD");
        }
    }
    public List<Taller> listarTalleres() throws Exception {
        try {
            return tallerRepository.findAll();
        }
        catch (Exception e){
            e.printStackTrace();
            throw new Exception("ERROR: NO SE PUDO LISTAR TODOS TODOS LOS TALLERES");
        }
    }

    public String eliminarTaller(Long id) throws Exception {
        String message = "ERROR: NO SE PUDO ELIMINAR EL TALLER CON ID: "+ id;
        try {
            Optional<Taller> tallerBusq = tallerRepository.findById(id);
            if (tallerBusq.isPresent()){
                tallerRepository.delete(tallerBusq.get());
                message = "TALLER CON ID: "+ id +" HA SIDO ELIMINADO CON EXITO";
            }
        }
        catch (Exception e){
            e.printStackTrace();
            throw new ResourceNotFoundException("ERROR: NO SE PUDO ELIMINAR EL TALLER PORQUE NO SE ENCONTRO EN LA BASE DE DATOS");
        }
        return message;
    }

    public Page<Taller> paginadoTalleres(Integer page) throws Exception {
        final Pageable pageable = PageRequest.of(
                page,
                10);
        try {
            return tallerRepository.findAll(pageable);
        }
        catch (Exception e){
            e.printStackTrace();
            throw new BadRequestException("ERROR: NO SE PUDO LISTAR LOS TALLERES");
        }
    }

    public String puntuarTaller(PuntuarTallerDTO ptDTO) throws Exception {
        try{
            Optional<Taller> tallerBusq = tallerRepository.findById(ptDTO.getTaller_id());
            if (tallerBusq.isPresent()){
                Valoracion valoracion = new Valoracion(ptDTO.getPuntos());
                valoracion.setTaller(tallerBusq.get());
                tallerBusq.get().addValoracion(valoracion);
                tallerRepository.save(tallerBusq.get());
                return "SE PUNTUO EL TALLER " + tallerBusq.get().getNombre() + " CON UNA VALORACION DE: " + ptDTO.getPuntos();
            }
            else {
                throw new ResourceNotFoundException("EL TALLER CON ID: "+ ptDTO.getTaller_id() + " NO SE ENCUENTRA EN LA BASE DE DATOS");
            }
        }
        catch (Exception e){
            e.printStackTrace();
            throw new BadRequestException("ERROR: NO SE PUDO AGREGAR LA VALORACION");
        }
    }

    public RetornoPromedioDTO promediarValoraciones(Long id) throws Exception {
        try {
            Optional<Taller> tallerBusq = tallerRepository.findById(id);
            if (tallerBusq.isPresent()){
               //return tallerBusq.get().promedio();
                RetornoPromedioDTO rpDTO = new RetornoPromedioDTO();
                rpDTO.setPromedio(tallerBusq.get().promedio());
                rpDTO.setCantidadValoraciones(tallerBusq.get().cantidadValoraciones());
                return rpDTO;
            }
            else {
                throw new ResourceNotFoundException("ERROR: NO SE PUDO ENCONTRAR EL TALLER");
            }
        }
        catch (Exception e){
            e.printStackTrace();
            throw new BadRequestException("ERROR: NO SE PUDO PROMEDIAR LAS PUNTUACIONES DEL TALLER");
        }
    }

    public String agregarPolitca(AgregarPoliticaDTO apDTO) throws Exception {
        Optional<Taller> tallerBusq = tallerRepository.findById(apDTO.getTallerId());
        if (tallerBusq.isPresent()){
            Politica politica = new Politica(apDTO.getNombrePolitica());
            politica.setTaller(tallerBusq.get());
            politicaRepository.save(politica);
            return "SE AGREGO LA POLITICA AL TALLER " + tallerBusq.get().getNombre();
        }
        else {
            throw new BadRequestException("ERROR: NO SE PUDO AGREGAR LA POLITICA");
        }
    }

    public String agregarServicio(AgregarServicioDTO asDTO) throws Exception {
        Optional<Taller> tallerBusq = tallerRepository.findById(asDTO.getTallerId());
        if (tallerBusq.isPresent()){
            Servicio servicio = new Servicio(asDTO.getNombreServicio());
            servicio.setTaller(tallerBusq.get());
            servicioRepository.save(servicio);
            return "SE AGREGO EL SERVICIO AL TALLER " + tallerBusq.get().getNombre();
        }
        else {
            throw new BadRequestException("ERROR: NO SE PUDO AGREGAR EL SERVICIO");
        }
    }

    public String agregarUrl(AgregarUrlDTO auDTO) throws Exception {
        Optional<Taller> tallerBusq = tallerRepository.findById(auDTO.getTallerId());
        if (tallerBusq.isPresent()){
            Imagen img = new Imagen(auDTO.getUrl());
            img.setTaller(tallerBusq.get());
            imagenRepository.save(img);
            return "SE AGREGO LA IMAGEN AL TALLER " + tallerBusq.get().getNombre();
        }
        else {
            throw new BadRequestException("ERROR: NO SE PUDO AGREGAR LA IMAGEN");
        }
    }

    public Taller tallerAdminUpdate(AdminUpdateTallerDTO autDTO) throws Exception {
        try {
            Optional<Taller> tallerBusq = tallerRepository.findById(autDTO.getId());
            if (tallerBusq.isPresent()){
                tallerBusq.get().setNombre(autDTO.getNombre());
                tallerBusq.get().setTelefono(autDTO.getTelefono());
                tallerBusq.get().setDescripcion(autDTO.getDireccion());
                tallerBusq.get().setUrlImgPrincipal(autDTO.getUrlImgPrincipal());
                tallerBusq.get().setDescripcion(autDTO.getDescripcion());
                Optional<Ciudad> ciudadBusq = ciudadRepository.findByNombre(autDTO.getNombreCiudad());
                Optional<Categoria> catBusq = categoriaRepository.findByTitulo(autDTO.getTituloCategoria());
                if (ciudadBusq.isPresent() && catBusq.isPresent()){
                    tallerBusq.get().setCiudad(ciudadBusq.get());
                    tallerBusq.get().setCategoria(catBusq.get());
                } else {
                    throw new BadRequestException("ERROR: LA CIUDAD O CATEGORIA NO SE ENCUENTRAN REGISTRADAS");
                }
                return tallerRepository.save(tallerBusq.get());
            }
            else {
                throw new BadRequestException("ERROR NO SE PUDO ENCONTRAR EL TALLER EN LA BASE DE DATOS");
            }
        }
        catch (Exception e){
            e.printStackTrace();
            throw new BadRequestException("ERROR: NO SE PUEDE ACTUALIZAR EL TALLER");
        }
    }

    public Set<Taller> buscarTalleresDisponibles(BuscarTallerFechaDTO btfDTO) throws Exception {
        try {
            Set<Taller> talleresCiudad = tallerRepository.findAllByCiudadNombre(btfDTO.getNombreCiudad());
            Iterator<Taller> iterator = talleresCiudad.iterator();
            while (iterator.hasNext()){
                Taller taller = iterator.next();
                List<Reserva> reservasEnFecha = reservaRepository.findAllByTallerIdAndFecha(taller.getId(), btfDTO.getFecha());
                if (reservasEnFecha.size() > 3) {
                    iterator.remove();
                }
            }
            return talleresCiudad;
        }
        catch (Exception e){
            e.printStackTrace();
            throw new BadRequestException("ERROR: NO SE PUDIERON BUSCAR LOS TALLERES EN ESE DIA");
        }
    }



}
