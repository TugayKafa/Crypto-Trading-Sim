package com.cryptolegend.cryptolegend.service;

import com.cryptolegend.cryptolegend.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    User registerUser(User user);

    Optional<User> findUserById(int userId);

    Optional<User> findUserByUsername(String username);

    List<User> getAllUsers();

    boolean userExists(int userId);

    int updateUserEmail(int userId, String newEmail);

    int removeUser(int userId);
}
