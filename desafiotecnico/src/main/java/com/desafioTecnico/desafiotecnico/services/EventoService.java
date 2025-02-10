package com.desafioTecnico.desafiotecnico.services;

import com.desafioTecnico.desafiotecnico.entities.Evento;
import com.desafioTecnico.desafiotecnico.entities.Usuario;
import com.desafioTecnico.desafiotecnico.repositories.EventoRepository;
import com.desafioTecnico.desafiotecnico.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

@Service
public class EventoService {

    @Autowired
    private EventoRepository eventoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;


    public Evento criarEvento(Evento evento, Long id){

       try{
           Optional<Usuario> usuarioOptional = usuarioRepository.findById(id);
           if(usuarioOptional.isEmpty()){
               throw new RuntimeException("Usuário não encontrado");
           }

           Usuario usuario = usuarioOptional.get();

           Evento newEvento = new Evento();
           evento.setNome(evento.getNome());
           evento.setDescricao(evento.getDescricao());
           evento.setHoraInicio(evento.getHoraInicio());
           evento.setHoraFim(evento.getHoraFim());
           evento.setUsuario(usuario);

           eventoRepository.save(evento);

           return evento;
       }catch (Exception e){
           throw new RuntimeException("Erro ao criar evento" + e.getMessage());
       }
    }

    public List<Evento> buscarEventosByIdUser(Long id){
        try{
            Optional<Usuario> usuarioOptional = usuarioRepository.findById(id);
            if (usuarioOptional.isEmpty()){
                throw new RuntimeException("Usario não encontrado");
            }

            Usuario usuario = usuarioOptional.get();
            List<Evento> eventos = eventoRepository.findByUsuario(usuario);

            if(eventos.isEmpty()){
                throw new RuntimeException("Nenhum evento encontrado para o usuário");
            }
            return eventos;
        }catch (Exception e){
            throw new RuntimeException("Erro ao buscar evento: " + e.getMessage());
        }
    }

    public Evento atualizarEvento(Evento eventoEditado, Long eventoId, Long usuarioId) {
        try {
            Optional<Usuario> usuarioOptional = usuarioRepository.findById(usuarioId);

            if (usuarioOptional.isEmpty()) {
                throw new RuntimeException("Usuário não encontrado");
            }
            Usuario usuario = usuarioOptional.get();
            Optional<Evento> eventoOptional = eventoRepository.findById(eventoId);
            if (eventoOptional.isEmpty()) {
                throw new RuntimeException("Evento não encontrado.");
            }
            Evento evento = eventoOptional.get();
            if (!evento.getUsuario().equals(usuario)) {
                throw new RuntimeException("Este evento não pertence ao usuário especificado.");
            }

            evento.setNome(eventoEditado.getNome());
            evento.setDescricao(eventoEditado.getDescricao());
            evento.setHoraInicio(eventoEditado.getHoraInicio());
            evento.setHoraFim(eventoEditado.getHoraFim());

            eventoRepository.save(evento);
            return evento;
        } catch (Exception e) {
            throw new RuntimeException("Erro ao editar evento: " + e.getMessage());
        }

    }

    public void deletarEvento(Long eventoId, Long usuarioId){
        try{
           Optional<Usuario> usuarioOptional = usuarioRepository.findById(usuarioId);
           if(usuarioOptional.isEmpty()){
               throw new RuntimeException("Usuário não encontrado");
           }
           Usuario usuario = usuarioOptional.get();

           Optional<Evento> eventoOptional = eventoRepository.findById(eventoId);
           if(eventoOptional.isEmpty()){
               throw new RuntimeException("Evento não encontrado");
           }

           Evento evento =eventoOptional.get();
           if(!evento.getUsuario().equals(usuario)){
               throw new RuntimeException("Você não tem permissão para excluir este evento");
           }
           eventoRepository.deleteById(eventoId);

        }catch (Exception e){
            throw new RuntimeException("Erro ao deletar evento: " + e.getMessage());
        }
    }

}
