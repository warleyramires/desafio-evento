package com.desafioTecnico.desafiotecnico.controllers;

import com.desafioTecnico.desafiotecnico.entities.Evento;
import com.desafioTecnico.desafiotecnico.services.EventoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/eventos")
public class EventoController {

    @Autowired
    private EventoService eventoService;

    @PostMapping("/usuarios/{id}/evento")
    public ResponseEntity<?> createEvent(@PathVariable Long id, @RequestBody Evento evento){
        try{
            Evento newEvento = eventoService.criarEvento(evento, id);
            return ResponseEntity.status(HttpStatus.CREATED).body(newEvento);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/usuario/{id}")
    public ResponseEntity<?> buscarEventoByUser(@PathVariable Long id){
        try{
            List<Evento> listEvents = eventoService.buscarEventosByIdUser(id);
            return ResponseEntity.status(HttpStatus.OK).body(listEvents);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping("/{eventoId}/usuario/{usuarioId}")
    public ResponseEntity<?> updateEventByUser(@RequestBody Evento evento, @PathVariable Long eventoId, @PathVariable Long usuarioId ){
        try{
            Evento updateEvent = eventoService.atualizarEvento(evento, eventoId, usuarioId);
            return ResponseEntity.status(HttpStatus.OK).body(updateEvent);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping("/{eventoId}/usuario/{usuarioId}")
    public ResponseEntity<?> deleteEvento(@PathVariable Long eventoId, @PathVariable Long usuarioId){
        try{
            eventoService.deletarEvento(eventoId, usuarioId);
            return ResponseEntity.status(HttpStatus.OK).body("");
        }catch (Exception e){
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> findAllEventos(){
        try{
            Optional<List<Evento>> eventos = eventoService.findAllEvents();
            return ResponseEntity.status(HttpStatus.OK).body(eventos);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro: "+ e.getMessage());
        }
    }
}
