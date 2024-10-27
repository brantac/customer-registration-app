import { Customer } from "@/domain/entities/Customer";
import type { CustomerRepository } from "@/domain/repositories/CustomerRepository";

export class UpdateCustomerUseCase {
    constructor(private customerRepository: CustomerRepository) {}

    async execute(customer: Customer): Promise<Customer> {
        const response = await this.customerRepository.update(customer);
        return new Customer(response);
    }
}