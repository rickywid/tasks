package com.example.demo.appUser;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AppUserService implements UserDetailsService {

    private AppUserRepository userRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public AppUserService(AppUserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser user = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        AppUserPrincipal userPrincipal = new AppUserPrincipal(user);
        return userPrincipal;
    }

    public void createUser(AppUser user) {
        userRepository.save(
                new AppUser(user.getUsername(), bCryptPasswordEncoder.encode(user.getPassword()))
        );
    }
}
