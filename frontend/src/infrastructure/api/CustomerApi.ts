import type { GetAllCustomersResponse, RegisterCustomerResponse } from "@/types/CustomerApiResponse";

export class CustomerApi {
    static async registerCustomer(customerData: {
        firstName: string,
        lastName: string,
        email: string,
        phone: string
    }): Promise<RegisterCustomerResponse> {
        try {
            const url = 'http://localhost:8080/api/v1/customers';
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const request = new Request(url, {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(customerData),
            });

            const response = await fetch(request);

            if (!response.status.toString().startsWith('2')) {
                throw new Error("Não foi possível registrar a(o) cliente " + customerData.firstName);
            }
            
            return await response.json();
        } catch (error) {
            throw new Error("Erro na requisição de clientes.");
        }
    }

    static async getAllCustomers(): Promise<GetAllCustomersResponse> {
        try {
            const url = 'http://localhost:8080/api/v1/customers';

            const response = await fetch(url);

            if (!response.status.toString().startsWith('2')) {
                throw new Error("Não foi possível recuperar os dados dos clientes.");
            }
            
            return await response.json();
        } catch (error) {
            throw new Error("Erro na requisição de clientes.");
        }
    }
}