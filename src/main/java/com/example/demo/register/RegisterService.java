package com.example.demo.register;

import com.example.demo.appUser.AppUser;
import com.example.demo.appUser.AppUserService;
import org.springframework.stereotype.Service;

@Service
public class RegisterService {
    private AppUserService appUserService;

    public RegisterService(AppUserService appUserService) {
        this.appUserService = appUserService;
    }

    public void register(AppUser user) {
        appUserService.createUser(user);
    }
}
