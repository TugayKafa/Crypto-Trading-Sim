package com.cryptolegend.cryptolegend.service.impl;

import com.cryptolegend.cryptolegend.entity.User;
import com.cryptolegend.cryptolegend.repostitory.UserRepository;
import com.cryptolegend.cryptolegend.service.AccountService;
import com.cryptolegend.cryptolegend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AccountService accountService;

    @Override
    public User registerUser(User user) {
        User res = userRepository.save(user).orElse(null);
        if (res != null) {
            accountService.createAccount(userRepository.findByUsername(user.getUsername()).get().getUserId());
        }
        return res;
    }

    @Override
    public Optional<User> findUserById(int userId) {
        return userRepository.findById(userId);
    }

    @Override
    public Optional<User> findUserByUsername(String username) {
        return userRepository.findByUsername(username);
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
