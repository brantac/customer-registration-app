import { Customer } from "@/domain/entities/Customer";
import type { CustomerRepository } from "@/domain/repositories/CustomerRepository";
import { CustomerApi } from "../api/CustomerApi";
import type { CustomerData } from "@/types/CustomerData";

export class CustomerApiRepository implements CustomerRepository {
    async register(newCustomer: CustomerData) {
        const registeredCustomer = await CustomerApi.registerCustomer(newCustomer);
        return new Customer(registeredCustomer);
    }
    async findById(id: string) {
        return await CustomerApi.getCustomer(id);
    }
    async getAllCustomers() {
        const response = await CustomerApi.getAllCustomers();
        return response.map(
            customer => {
                return new Customer(customer);
        });
    }
    async delete(customerId: string) {
        await CustomerApi.delete(customerId);
    }
    async update({ id, firstName, lastName, email, phone }: Customer) {
        return await CustomerApi.update({ id: id as string, firstName, lastName, email, phone });
    }
}