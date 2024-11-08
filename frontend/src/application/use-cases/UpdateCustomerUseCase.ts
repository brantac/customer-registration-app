import { Customer } from "@/domain/entities/Customer";
import type { CustomerRepository } from "@/domain/repositories/CustomerRepository";
import type { CustomerData } from "@/types/CustomerData";

export class UpdateCustomerUseCase {
    constructor(private customerRepository: CustomerRepository) {}

    async execute(customer: CustomerData) {
        return await this.customerRepository.update(new Customer(customer));
    }
}