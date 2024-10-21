import type { GetAllCustomersResponse } from "@/types/CustomerApiResponse";
import type { Customer } from "../entities/Customer";

export interface CustomerRepository {
    register(customer: Customer): Promise<string>;
    findById(id: String): Promise<Customer>;
    getAllCustomers(): Promise<GetAllCustomersResponse>;
    delete(customerId: string): Promise<void>;
}