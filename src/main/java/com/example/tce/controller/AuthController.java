package com.example.tce.controller;

import com.example.tce.dto.LoginRequest;
import com.example.tce.dto.LoginResponse;
import com.example.tce.dto.RegisterRequest;
import com.example.tce.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")   // ✅ REMOVED auth
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private AuthService service;

    // REGISTER
    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest req) {
        return service.register(req);
    }

    // LOGIN
    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest req) {
        return service.login(req);
    }
}