package com.cryptolegend.cryptolegend.repostitory;

import com.cryptolegend.cryptolegend.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository {
    int save(User user);

    Optional<User> findById(int userId);

    List<User> findAll();

    boolean existedById(int userId);

    int updateEmail(int userId, String newEmail);

    int deleteById(int userId);
}
