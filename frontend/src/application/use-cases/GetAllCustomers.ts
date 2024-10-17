import type { CustomerRepository } from "@/domain/repositories/CustomerRepository";
import type { GetAllCustomersResponse } from "@/types/CustomerApiResponse";

export class GetAllCustomers {
    constructor(private customerRepository: CustomerRepository) {}

    async execute(): Promise<GetAllCustomersResponse> {
        return await this.customerRepository.getAllCustomers();
    }
}