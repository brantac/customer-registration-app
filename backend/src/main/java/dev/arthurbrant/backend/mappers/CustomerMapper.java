package dev.arthurbrant.backend.mappers;

import org.springframework.stereotype.Component;

import dev.arthurbrant.backend.domain.user.Customer;
import dev.arthurbrant.backend.dto.CustomerDTO;

@Component
public class CustomerMapper {
    public CustomerDTO toDto(Customer customer) {
        return new CustomerDTO(
            customer.getId(),
            customer.getFirstName(),
            customer.getLastName(),
            customer.getEmail(),
            customer.getPhone()
        );
    }

    public Customer toEntity(CustomerDTO customerDto) {
        return new Customer(
            customerDto.id(),
            customerDto.firstName(),
            customerDto.lastName(),
            customerDto.email(),
            customerDto.phone()
        );
    }
}
