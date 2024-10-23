import type { Customer } from "@/domain/entities/Customer";
import type { CustomerRepository } from "@/domain/repositories/CustomerRepository";
import { CustomerApi } from "../api/CustomerApi";

export class CustomerApiRepository implements CustomerRepository {
    async register(customer: Customer) {
        const registeredCustomer = await CustomerApi.registerCustomer(customer);
        return registeredCustomer.id;
    }
    findById(id: String): Promise<Customer> {
        throw new Error("Method not implemented.");
    }
    async getAllCustomers() {
        return await CustomerApi.getAllCustomers();
    }
    async delete(customerId: string) {
        await CustomerApi.delete(customerId);
    }
}