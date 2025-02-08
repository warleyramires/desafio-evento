package com.desafioTecnico.desafiotecnico.services;

import com.desafioTecnico.desafiotecnico.dtos.UsuarioRequestDto;
import com.desafioTecnico.desafiotecnico.dtos.UsuarioResponseDto;
import com.desafioTecnico.desafiotecnico.entities.Usuario;
import com.desafioTecnico.desafiotecnico.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public Optional<?> criarUsuario(UsuarioRequestDto usuarioRequestDto){

        try{
            Optional<Usuario> optionalUsuario = usuarioRepository.findByEmail(usuarioRequestDto.email());

            if(optionalUsuario.isEmpty()){
                Usuario usuario = new Usuario();
                usuario.setName(usuarioRequestDto.name());
                usuario.setEmail(usuarioRequestDto.email());
                usuario.setPassword(passwordEncoder.encode(usuarioRequestDto.password()));

                usuarioRepository.save(usuario);

                return Optional.of(new UsuarioResponseDto(usuario.getId(), usuario.getName(), usuario.getEmail()));
            }

            throw new RuntimeException("Já existe um usuário com esse email.");

        }catch (Exception e){
            throw new RuntimeException("Não foi possivel criar usuário");
        }

    }

}
