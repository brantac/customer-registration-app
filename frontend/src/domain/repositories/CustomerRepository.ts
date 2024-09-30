import type { Customer } from "../entities/Customer";

type CustomerId = string;

export interface CustomerRepository {
    register(customer: Customer): Promise<CustomerId>;
    findById(id: String): Promise<Customer>;
    getAllCustomers(): Promise<Customer[]>;
}