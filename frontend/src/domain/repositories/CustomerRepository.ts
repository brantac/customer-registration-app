import type { GetCustomerResponse, GetCustomersResponse, UpdateCustomerResponse } from "@/types/CustomerApiResponse";
import type { Customer } from "../entities/Customer";

export interface CustomerRepository {
    register(customer: Customer): Promise<string>;
    findById(id: string): Promise<GetCustomerResponse>;
    getAllCustomers(): Promise<GetCustomersResponse>;
    delete(customerId: string): Promise<void>;
    update(customerData: Customer): Promise<UpdateCustomerResponse>;
}