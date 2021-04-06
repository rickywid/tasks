package com.example.demo.register;

import com.example.demo.appUser.AppUser;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
public class RegisterController {

    private final RegisterService registerService;

    public RegisterController(RegisterService registerService) {
        this.registerService = registerService;
    }

    @PostMapping(path = "/register")
    public String register(@RequestBody AppUser user) {
        System.out.println(">>>>>>>>>>>>. REGISTER");
        System.out.println(user);
        registerService.register(user);
        return "User has been created. Please login.";
    }

    @RequestMapping("/login")
    public String user(Principal user) {
        Object obj = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        System.out.println(obj);
        return user.getName();
    }

    @RequestMapping("/user")
    public String currentUserName() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        Authentication principal = SecurityContextHolder.getContext().getAuthentication();
        Object getName = SecurityContextHolder.getContext().getAuthentication().getName();
        Object isAuthenticated = SecurityContextHolder.getContext().getAuthentication().isAuthenticated();
        Object getDetails = SecurityContextHolder.getContext().getAuthentication().getDetails();
        Object getAuthorities = SecurityContextHolder.getContext().getAuthentication().getAuthorities();
        Object getCredentials = SecurityContextHolder.getContext().getAuthentication().getCredentials();
        System.out.println(principal);
        System.out.println(getName);
        System.out.println(isAuthenticated);
        System.out.println(getDetails);
        System.out.println(getAuthorities);
        System.out.println(getCredentials);

        return username;
    }
}
