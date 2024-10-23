import { Customer } from "@/domain/entities/Customer";
import type { CustomerRepository } from "@/domain/repositories/CustomerRepository";

export class RegisterCustomer {
    constructor(private customerRepository: CustomerRepository) {}

    async execute(customer: Customer): Promise<string> {
        return await this.customerRepository.register(customer);
    }
}