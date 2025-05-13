package com.cryptolegend.cryptolegend.service.impl;

import com.cryptolegend.cryptolegend.entity.User;
import com.cryptolegend.cryptolegend.repostitory.UserRepository;
import com.cryptolegend.cryptolegend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public int registerUser(User user) {
        return userRepository.save(user);
    }


    @Override
    public Optional<User> findUserById(int userId) {
        return userRepository.findById(userId);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public boolean userExists(int userId) {
        return userRepository.existedById(userId);
    }

    @Override
    public int updateUserEmail(int userId, String newEmail) {
        return userRepository.updateEmail(userId, newEmail);
    }

    @Override
    public int removeUser(int userId) {
        return userRepository.deleteById(userId);
    }
}
