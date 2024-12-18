package dev.arthurbrant.backend.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.arthurbrant.backend.domain.user.Customer;
import dev.arthurbrant.backend.dto.CustomerDTO;
import dev.arthurbrant.backend.dto.PatchCustomerRequestDTO;
import dev.arthurbrant.backend.dto.PatchCustomerResponseDTO;
import dev.arthurbrant.backend.dto.RegisterCustomerResponseDTO;
import dev.arthurbrant.backend.dto.RegisterRequestDTO;
import dev.arthurbrant.backend.mappers.CustomerMapper;
import dev.arthurbrant.backend.services.CustomerService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/customers")
@RequiredArgsConstructor
public class CustomerController {
    private final CustomerService service;
    private final CustomerMapper customerMapper;

    @GetMapping
    public ResponseEntity<List<CustomerDTO>> getCustomers() {
        List<Customer> customers = this.service.getAllCustomers();
        List<CustomerDTO> customerDTOs = customers.stream()
            .map(customerMapper::toDto)
            .toList();
        return ResponseEntity.ok(customerDTOs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomerDTO> getCustomer(@PathVariable String id) {
        Customer customer = this.service.getCustomerById(id);
        return ResponseEntity.ok(customerMapper.toDto(customer));
    }

    @PostMapping()
    public ResponseEntity<RegisterCustomerResponseDTO> register(@RequestBody RegisterRequestDTO body) {
        Customer customer = this.service.register(body);
        return ResponseEntity.status(HttpStatus.CREATED).body(new RegisterCustomerResponseDTO(
            customer.getId(),
            customer.getFirstName(),
            customer.getLastName(),
            customer.getEmail(),
            customer.getPhone()
        ));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable String id) {
        this.service.delete(id);
        return ResponseEntity.noContent().build();
    }
    
    @PatchMapping("/{id}")
    public ResponseEntity<PatchCustomerResponseDTO> patch(@PathVariable String id, @RequestBody PatchCustomerRequestDTO body) {
        Customer customer = this.service.update(id, body);
        return ResponseEntity.ok(new PatchCustomerResponseDTO(
            customer.getId(),
            customer.getFirstName(),
            customer.getLastName(),
            customer.getEmail(),
            customer.getPhone()
        ));
    }
}
