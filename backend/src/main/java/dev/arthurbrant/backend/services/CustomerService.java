package dev.arthurbrant.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import dev.arthurbrant.backend.domain.user.Customer;
import dev.arthurbrant.backend.dto.GetCustomerResponseDTO;
import dev.arthurbrant.backend.dto.PatchCustomerRequestDTO;
import dev.arthurbrant.backend.dto.RegisterRequestDTO;
import dev.arthurbrant.backend.dto.ResponseDTO;
import dev.arthurbrant.backend.exceptions.CustomerAlreadyExistsException;
import dev.arthurbrant.backend.exceptions.CustomerNotFoundException;
import dev.arthurbrant.backend.repositories.CustomerRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomerService {
    private final CustomerRepository repository;

    public Customer register(RegisterRequestDTO dto) {
        Optional<Customer> customer = this.repository.findByEmail(dto.email());

        if (customer.isPresent()) {
            throw new CustomerAlreadyExistsException();
        }

        return this.repository.save(new Customer(
            dto.firstName(),
            dto.lastName(),
            dto.email(),
            dto.phone()
        ));
    }

    public Customer getCustomerById(String id) {
        Customer customer = this.repository.findById(id).orElseThrow(CustomerNotFoundException::new);
        return customer;
    }

    public List<Customer> getAllCustomers() {
        return this.repository.findAll();
        
    }

    public void delete(String id) {
        Customer customer = this.getCustomerById(id);
        this.repository.delete(customer);
    }

    public Customer update(String id, PatchCustomerRequestDTO dto) {
        Customer customer = this.repository.findById(id).orElseThrow(CustomerNotFoundException::new);

        if (dto.firstName() != null) {
            customer.setFirstName(dto.firstName());
        }
        if (dto.lastName() != null) {
            customer.setLastName(dto.lastName());
        }
        if (dto.email() != null) {
            customer.setEmail(dto.email());
        }
        if (dto.phone() != null) {
            customer.setPhone(dto.phone());
        }
        
        return this.repository.save(customer);
    }
}
