import type { Customer } from "@/domain/entities/Customer";
import type { CustomerRepository } from "@/domain/repositories/CustomerRepository";

export class UpdateCustomerUseCase {
    constructor(private customerRepository: CustomerRepository) {}

    async execute(customer: Customer): Promise<void> {
        await this.customerRepository.update(customer);
    }
}