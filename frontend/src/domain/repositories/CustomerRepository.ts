import type { GetCustomersResponse, UpdateCustomerResponse } from "@/types/CustomerApiResponse";
import type { Customer } from "../entities/Customer";

export interface CustomerRepository {
    register(customer: Customer): Promise<string>;
    findById(id: String): Promise<Customer>;
    getAllCustomers(): Promise<GetCustomersResponse>;
    delete(customerId: string): Promise<void>;
    update(customerData: Customer): Promise<UpdateCustomerResponse>;
}