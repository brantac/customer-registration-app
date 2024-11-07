import type { CustomerRepository } from "@/domain/repositories/CustomerRepository";
import type { CustomerData } from "@/types/CustomerData";

export class RegisterCustomer {
    constructor(private customerRepository: CustomerRepository) {}

    async execute(customer: CustomerData) {
        return await this.customerRepository.register(customer);
    }
}