import type { GetCustomerResponse, UpdateCustomerResponse } from "@/types/CustomerApiResponse";
import type { Customer } from "../entities/Customer";
import type { CustomerData } from "@/types/CustomerData";

export interface CustomerRepository {
    register(newCustomer: CustomerData): Promise<Customer>;
    findById(id: string): Promise<GetCustomerResponse>;
    getAllCustomers(): Promise<Customer[]>;
    delete(customerId: string): Promise<void>;
    update(customerData: Customer): Promise<UpdateCustomerResponse>;
}