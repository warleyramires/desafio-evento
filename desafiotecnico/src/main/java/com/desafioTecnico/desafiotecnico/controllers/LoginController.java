package com.desafioTecnico.desafiotecnico.controllers;

import com.desafioTecnico.desafiotecnico.dtos.LoginRequestDto;
import com.desafioTecnico.desafiotecnico.dtos.UsuarioResponseDto;
import com.desafioTecnico.desafiotecnico.services.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/login")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping
    public ResponseEntity<?> login(@RequestBody LoginRequestDto loginRequestDto){
        try{
            UsuarioResponseDto usuarioResponseDto = loginService.login(loginRequestDto);
            return ResponseEntity.status(HttpStatus.OK).body(usuarioResponseDto);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

}
