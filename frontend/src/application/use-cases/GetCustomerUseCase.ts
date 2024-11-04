import { Customer } from "@/domain/entities/Customer";
import type { CustomerRepository } from "@/domain/repositories/CustomerRepository";

export class GetCustomerUseCase {
    constructor(private customerRepository: CustomerRepository) {}

    async execute(customerId: string): Promise<Customer> {
        const response = await this.customerRepository.findById(customerId);
        return new Customer(response);
    }
}