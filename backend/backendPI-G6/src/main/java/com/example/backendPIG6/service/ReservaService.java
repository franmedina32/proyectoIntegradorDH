package com.example.backendPIG6.service;

import com.example.backendPIG6.domain.Reserva;
import com.example.backendPIG6.domain.Taller;
import com.example.backendPIG6.domain.Usuario;
import com.example.backendPIG6.domain.Vehiculo;
import com.example.backendPIG6.dto.reservas.BuscarReservasUsuarioDTO;
import com.example.backendPIG6.dto.reservas.RegistroReservaDTO;
import com.example.backendPIG6.exceptions.BadRequestException;
import com.example.backendPIG6.exceptions.ResourceNotFoundException;
import com.example.backendPIG6.repository.ReservaRepository;
import com.example.backendPIG6.repository.TallerRepository;
import com.example.backendPIG6.repository.UsuarioRepository;
import com.example.backendPIG6.repository.VehiculoRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ReservaService {
    private final VehiculoRepository vehiculoRepository;
    private final TallerRepository tallerRepository;
    private final UsuarioRepository usuarioRepository;
    private final ReservaRepository reservaRepository;
    private final EmailService emailService;

    public Reserva registerReserva(RegistroReservaDTO rrDTO) throws Exception {
        try {
            Vehiculo vehiculo_reserva = null;
            Optional<Vehiculo> searchVeh = vehiculoRepository.findByModelo(rrDTO.getModelo());
            vehiculo_reserva = searchVeh.orElseGet(() -> vehiculoRepository.save(new Vehiculo(rrDTO.getModelo(), rrDTO.getMarca(), rrDTO.getPlaca(), rrDTO.getAnio(), rrDTO.getCilindraje(), true)));
            Optional<Usuario> usuario_reserva = usuarioRepository.findByEmail(rrDTO.getUser_email());
            if (usuario_reserva.isEmpty()){
                throw new BadRequestException("ERROR: NO SE PUEDE REGISTRAR LA RESERVA PORQUE EL USUARIO NO SE ENCUENTRA EN EL SISTEMA");
            }
            Optional<Taller> taller_reserva = tallerRepository.findById(rrDTO.getTaller_id());
            if (taller_reserva.isEmpty()){
                throw new BadRequestException("ERROR: NO SE PUEDE REGISTRAR LA RESERVA PORQUE EL TALLER NO SE ENCUENTRA EN EL SISTEMA");
            }
            emailService.sendMail(
                    rrDTO.getUser_email(),
                    "SE HA REGISTRADO SU RESERVA",
                    "Su reserva se ha registrado con exito! \n su vehiculo: " + vehiculo_reserva.getModelo() + "\n"
                    + " sera revisado por nuestros expertos del taller: " + taller_reserva.get().getNombre()  + "\n" +
                             "DIRECCION: " + taller_reserva.get().getDireccion() + "\n" +
                    "DIA: " + rrDTO.getFecha().getDayOfMonth() + " MES: " + rrDTO.getFecha().getMonth() + " AÑO: " + rrDTO.getFecha().getYear()
                            + " HORARIO : " + rrDTO.getFecha().getHour() + ":" + rrDTO.getFecha().getMinute()
            );
            return reservaRepository.save(new Reserva(usuario_reserva.get(), vehiculo_reserva, taller_reserva.get(), rrDTO.getFecha()));
        }
        catch (Exception e){
            e.printStackTrace();
            throw new BadRequestException("ERROR: NO SE PUDO REGISTRAR LA RESERVA");
        }
    }

    public List<Reserva> buscarReservasUsuario(BuscarReservasUsuarioDTO bruDTO) throws Exception {
        try{
            List<Reserva> listaReservas = reservaRepository.findByUsuarioEmailOrderByFechaDesc(bruDTO.getEmail());
            return listaReservas;
        }
        catch (Exception e){
            e.printStackTrace();
            throw new BadRequestException("ERROR: NO SE PUDO BUSCAR LAS RESERVAS DEL USUARIO");
        }
    }

    public String eliminarReserva (Long id) throws Exception {
        try {
            Optional<Reserva> reservaBusq = reservaRepository.findById(id);
            if (reservaBusq.isPresent()){
                reservaRepository.delete(reservaBusq.get());
                return "SE HA ELIMINADO LA RESERVA CON EXITO";
            }
            else {
                throw new ResourceNotFoundException("ERROR: NO SE PUDO ELIMINAR LA RESERVA PORQUE NO SE ENCONTRO EN EL SISTEMA");
            }
        }
        catch (Exception e){
            e.printStackTrace();
            throw new BadRequestException("ERROR: NO SE PUDO ELIMINAR LA RESERVA");
        }
    }

}
