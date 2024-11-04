import type { Customer } from "@/domain/entities/Customer";
import type { CustomerRepository } from "@/domain/repositories/CustomerRepository";
import { CustomerApi } from "../api/CustomerApi";

export class CustomerApiRepository implements CustomerRepository {
    async register({ firstName, lastName, email, phone }: Customer) {
        const registeredCustomer = await CustomerApi.registerCustomer({firstName, lastName, email, phone});
        return registeredCustomer.id;
    }
    async findById(id: string) {
        return await CustomerApi.getCustomer(id);
    }
    async getAllCustomers() {
        return await CustomerApi.getAllCustomers();
    }
    async delete(customerId: string) {
        await CustomerApi.delete(customerId);
    }
    async update({ id, firstName, lastName, email, phone }: Customer) {
        return await CustomerApi.update({ id: id as string, firstName, lastName, email, phone });
    }
}