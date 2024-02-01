package ru.kata.spring.boot_security.demo.init;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.repository.UserRepository;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import javax.annotation.PostConstruct;
import java.util.Set;

@Service
public class AppInit {

    private final UserService userService;
    private final RoleService roleService;

    private final PasswordEncoder passwordEncoder;


    @Autowired
public AppInit(UserService userService, RoleService roleService, PasswordEncoder passwordEncoder){
        this.userService = userService;
        this.roleService = roleService;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    @PostConstruct
    public void cretaeDefualtUsers() {
        roleService.save(new Role("ROLE_ADMIN"));
        roleService.save(new Role("ROLE_USER"));
        userService.saveUser(new User("admin", 23, "admin", Set.of(new Role(1L, "ROLE_ADMIN"))));
        userService.saveUser(new User("user", 23, "user", Set.of(new Role(2L, "ROLE_USER"))));
    }


}
