package com.desafioTecnico.desafiotecnico.services;

import com.desafioTecnico.desafiotecnico.dtos.LoginRequestDto;
import com.desafioTecnico.desafiotecnico.dtos.UsuarioResponseDto;
import com.desafioTecnico.desafiotecnico.entities.Usuario;
import com.desafioTecnico.desafiotecnico.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LoginService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UsuarioResponseDto login(LoginRequestDto loginRequestDto){
        try {
            Optional<Usuario> usuarioOptional = usuarioRepository.findByEmail(loginRequestDto.email());

            if (usuarioOptional.isEmpty()) {
                throw new RuntimeException("Usuário não encontrado");
            }

            Usuario usuario = usuarioOptional.get();
            if (!passwordEncoder.matches(loginRequestDto.password(), usuario.getPassword())) {
                throw new RuntimeException("Senha incorreta");
            }

            return new UsuarioResponseDto(usuario.getId(), usuario.getName(), usuario.getEmail());

        } catch (Exception e) {
            throw new RuntimeException("Erro ao efetuar login: " + e.getMessage());
        }
    }

}
