package com.desafioTecnico.desafiotecnico.controllers;

import com.desafioTecnico.desafiotecnico.dtos.UsuarioRequestDto;
import com.desafioTecnico.desafiotecnico.dtos.UsuarioResponseDto;
import com.desafioTecnico.desafiotecnico.entities.Usuario;
import com.desafioTecnico.desafiotecnico.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {
    @Autowired
    private UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody UsuarioRequestDto usuarioRequestDto){
        try {
            Optional<?> usuarioResponseDto = usuarioService.criarUsuario(usuarioRequestDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(usuarioResponseDto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
