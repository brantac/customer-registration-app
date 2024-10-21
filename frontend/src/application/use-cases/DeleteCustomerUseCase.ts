import type { CustomerRepository } from "@/domain/repositories/CustomerRepository";

export class DeleteCustomerUseCase {
    constructor(private customerRepository: CustomerRepository) {}

    async execute(customerId: string): Promise<void> {
        await this.customerRepository.delete(customerId);
    }
}