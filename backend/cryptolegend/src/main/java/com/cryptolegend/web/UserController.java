package com.cryptolegend.cryptolegend.web;

import com.cryptolegend.cryptolegend.entity.User;
import com.cryptolegend.cryptolegend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController()
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        User result = userService.registerUser(user);
        if (result != null) {
            return ResponseEntity.ok("User registered successfully!");
        } else {
            return ResponseEntity.status(500).body("Failed to register user.");
        }
    }

    @PutMapping("/{userId}/email")
    public ResponseEntity<String> updateUserEmail(@PathVariable int userId, @RequestBody String newEmail) {
        int result = userService.updateUserEmail(userId, newEmail);
        if (result > 0) {
            return ResponseEntity.ok("Email updated successfully!");
        } else {
            return ResponseEntity.status(500).body("Failed to update email.");
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable int userId) {
        Optional<User> user = userService.findUserById(userId);
        return user.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable int userId) {
        int result = userService.removeUser(userId);
        if (result > 0) {
            return ResponseEntity.ok("User deleted successfully!");
        } else {
            return ResponseEntity.status(500).body("Failed to delete user.");
        }
    }
}
