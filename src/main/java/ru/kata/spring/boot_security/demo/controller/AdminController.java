package ru.kata.spring.boot_security.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;

@Controller
@RequestMapping("/admin/")
public class AdminController {

    private final UserService userService;
    private final RoleService roleService;

    public AdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("/")
    public String printUsers(ModelMap model, Principal principal, @ModelAttribute("user") User user) {

        model.addAttribute("currentUser", userService.findUserByUsername(principal.getName()));
        model.addAttribute("roles", roleService.findAllRoles());
        model.addAttribute("users", userService.findAllUsers());
        return "userListApi";
    }

    @GetMapping(value = "/removeUser/{id}")
    public String removeUser(@PathVariable("id") Long id) {
        userService.removeUserById(id);
        return "redirect:/admin/";
    }

    @GetMapping("/addUser")
    public String printAddUserPage(ModelMap modelMap, @ModelAttribute("user") User user) {
        modelMap.addAttribute("roles" , roleService.findAllRoles());
        return "adduser";
    }

    @PostMapping("/addUser")
    public String addUser(ModelMap modelMap, @ModelAttribute("user") User user) {
        userService.saveUser(user);
        return "redirect:/admin/";
    }


    @GetMapping("/edit/{id}")
    public String editUser(@PathVariable("id") Long id, User user, Role roles, ModelMap modelMap) {
        modelMap.addAttribute("user", userService.findUserById(id));
        modelMap.addAttribute("roles",roleService.findAllRoles());
        return "edit";
    }

    @PostMapping("/edit/{id}")
    public String UpdateUser(@PathVariable("id") Long id,  User user) {
        userService.updateUser(id, user);
        return "redirect:/admin/";
    }


}
