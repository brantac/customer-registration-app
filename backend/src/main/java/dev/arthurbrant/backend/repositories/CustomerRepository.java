package dev.arthurbrant.backend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.arthurbrant.backend.domain.user.Customer;

public interface CustomerRepository extends JpaRepository<Customer, String> {
    Optional<Customer> findByEmail(String email);
}
