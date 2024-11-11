import type { CustomerRepository } from "@/domain/repositories/CustomerRepository";
import type { CustomerData } from "@/types/CustomerData";

export class GetAllCustomersUseCase {
    constructor(private customerRepository: CustomerRepository) {}

    async execute(): Promise<CustomerData[]> {
        const customers = await this.customerRepository.getAllCustomers();
        return customers.map(customer => customer.data());
    }
}