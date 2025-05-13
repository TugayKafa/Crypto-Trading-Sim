package com.cryptolegend.cryptolegend.repostitory.impl;

import com.cryptolegend.cryptolegend.entity.User;
import com.cryptolegend.cryptolegend.repostitory.UserRepository;
import com.cryptolegend.cryptolegend.repostitory.mapper.UserRowMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class UserRepositoryImpl implements UserRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public Optional<User> save(User user) {
        String sql = "INSERT INTO USERS (username, email) VALUES (?, ?)";
        int affectedRows = jdbcTemplate.update(sql, user.getUsername(), user.getEmail());
        if (affectedRows == 0) {
            return Optional.empty();
        } else {
            return Optional.of(user);
        }
    }

    @Override
    public Optional<User> findById(int userId) {
        String sql = "SELECT * FROM users WHERE user_id = ?";
        List<User> users = jdbcTemplate.query(sql, new UserRowMapper(), userId);
        return users.stream().findFirst();
    }

    @Override
    public Optional<User> findByUsername(String username) {
        String sql = "SELECT * FROM users WHERE username = ?";
        List<User> users = jdbcTemplate.query(sql, new UserRowMapper(), username);
        return users.stream().findFirst();
    }

    @Override
    public List<User> findAll() {
        String sql = "SELECT * FROM users";
        List<User> users = jdbcTemplate.query(sql, new UserRowMapper());
        return users;
    }

    @Override
    public boolean existedById(int userId) {
        String sql = "SELECT * FROM users WHERE user_id = ?";
        List<User> users = jdbcTemplate.query(sql, new UserRowMapper(), userId);
        return users.size() > 0;
    }

    @Override
    public int updateEmail(int userId, String newEmail) {
        String sql = "UPDATE users SET email = ? WHERE user_id = ?";
        return jdbcTemplate.update(sql, newEmail, userId);
    }

    @Override
    public int deleteById(int userId) {
        String sql = "DELETE FROM users WHERE user_id = ?";
        return jdbcTemplate.update(sql, userId);
    }
}
