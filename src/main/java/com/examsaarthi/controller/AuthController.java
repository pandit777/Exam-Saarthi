package com.examsaarthi.controller;

import com.examsaarthi.dto.SignupRequest;
import com.examsaarthi.service.UserService;
import jakarta.validation.Valid;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/signup")
    public String signupPage(Model model) {
        model.addAttribute("signupRequest", new SignupRequest());
        return "signup";
    }

    @PostMapping("/signup")
    public String signup(@Valid @ModelAttribute SignupRequest signupRequest, BindingResult bindingResult, Model model) {
        if (bindingResult.hasErrors()) {
            return "signup";
        }

        boolean registered = userService.register(signupRequest);
        if (!registered) {
            model.addAttribute("emailError", "Email already exists.");
            return "signup";
        }

        return "redirect:/signin?registered";
    }

    @GetMapping("/signin")
    public String signinPage() {
        return "signin";
    }
}
