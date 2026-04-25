package com.example.tce.service;

import com.example.tce.dto.LoginRequest;
import com.example.tce.dto.LoginResponse;
import com.example.tce.dto.RegisterRequest;
import com.example.tce.entity.User;
import com.example.tce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository repo;

    // REGISTER
    public String register(RegisterRequest req) {

        if (repo.findByUsername(req.getUsername()) != null) {
            return "USER_EXISTS";
        }

        User u = new User();
        u.setUsername(req.getUsername());
        u.setPassword(req.getPassword());

        repo.save(u);

        return "REGISTER_SUCCESS";
    }

    // LOGIN (WITH RESPONSE DTO)
    public LoginResponse login(LoginRequest req) {

        User user = repo.findByUsernameAndPassword(
                req.getUsername(),
                req.getPassword()
        );

        if (user != null) {
            return new LoginResponse("LOGIN_SUCCESS", true);
        }

        return new LoginResponse("INVALID_USER", false);
    }
}