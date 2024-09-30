import { Customer } from "@/domain/entities/Customer";
import type { CustomerRepository } from "@/domain/repositories/CustomerRepository";

export class RegisterCustomer {
    constructor(private customerRepository: CustomerRepository) {}

    async execute(firstName: string, lastName: string, email: string): Promise<string> {
        const customer = new Customer(firstName, lastName, email);
        return await this.customerRepository.register(customer);
    }
}