package com.desafioTecnico.desafiotecnico.repositories;

import com.desafioTecnico.desafiotecnico.entities.Evento;
import com.desafioTecnico.desafiotecnico.entities.Usuario;
import jdk.jfr.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventoRepository extends JpaRepository<Evento, Long> {

    List<Evento> findByUsuario(Usuario usuario);
}
