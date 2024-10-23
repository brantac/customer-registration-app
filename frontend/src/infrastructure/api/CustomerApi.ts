import type { CustomerType, GetAllCustomersResponse, RegisterCustomerRequestType, RegisterCustomerResponseType, UpdateCustomerRequest, UpdateCustomerResponse } from "@/types/CustomerApiResponse";
import { CustomerNotFoundError } from "../errors/customer-api/CustomerNotFoundError";
import { ServerError } from "../errors/ServerError";
import { customerApiErrorHandler } from "../errors/utils/customerApiErrorHandler";
import { Customer } from "@/domain/entities/Customer";
import { CustomerAlreadyExistsError } from "../errors/customer-api/CustomerAlreadyExistsError";

interface RestErrorResponse {
    message: string;
    details: string;
    status: string
}

export class CustomerApi {
    static async registerCustomer(newCustomer: Customer): Promise<RegisterCustomerResponseType> {
        try {
            const url = 'http://localhost:8080/api/v1/customers';
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const request = new Request(url, {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify({
                    firstName: newCustomer.firstName,
                    lastName: newCustomer.lastName,
                    email: newCustomer.email,
                    phone: newCustomer.phone,
                }),
            });

            const response = await fetch(request);

            if (response.ok) return await response.json();            
            else {
                const errorData: RestErrorResponse = await response.json();
                // Status === 409 --> Conflict (CREATE THIS ERROR TYPE)
                if (response.status === 409) {
                    throw new CustomerAlreadyExistsError(errorData.message, errorData.details, errorData.status);
                }
                else throw new ServerError(errorData.message, errorData.details);
            }
        } catch (error: unknown) {
            throw customerApiErrorHandler(error);
        }
    }

    static async getAllCustomers(): Promise<GetAllCustomersResponse> {
        try {
            const url = 'http://localhost:8080/api/v1/customers';

            const response = await fetch(url);

            if(response.ok) return await response.json();
            else throw new ServerError(`Erro no servidor: servidor respondeu com status ${response.status}`);
        } catch (error) {
            throw customerApiErrorHandler(error);
        }
    }

    static async delete(customerId: string) {
        try {
            const url = `http://localhost:8080/api/v1/customers/${customerId}`;

            const response = await fetch(url, {
                method: "Delete"
            });
            // Status === 204 --> User deleted
            if (response.status === 204) return;

            if (!response.ok) {
                const errorData: RestErrorResponse = await response.json();
                if (response.status === 404) throw new CustomerNotFoundError(errorData.message, errorData.details);
                else throw new ServerError(errorData.message, errorData.details);
            }
        } catch (error: unknown) {
            customerApiErrorHandler(error);
        }
    }

    static async update(customerData: UpdateCustomerRequest): Promise<UpdateCustomerResponse> {
        try {
            const url = 'http://localhost:8080/api/v1/customers';
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const request = new Request(url, {
                method: 'PUT',
                headers: myHeaders,
                body: JSON.stringify(customerData),
            });

            const response = await fetch(request);

            // Status === 200 --> User updated
            if (response.ok) {
                return await response.json() as UpdateCustomerResponse;
            }
            else {
                const errorData: RestErrorResponse = await response.json();
                if (response.status === 404) throw new CustomerNotFoundError(errorData.message, errorData.details);
                // Add checks for 400: Bad Request
                else if (response.status === 409) {
                    throw new CustomerAlreadyExistsError(errorData.message, errorData.details, errorData.status);
                }
                else throw new ServerError(errorData.message, errorData.details);
            }
        } catch (error: unknown) {
            throw customerApiErrorHandler(error);
        }
    }
}