export interface CustomerType {
    id: string;
    email: string;
    firstName: string;
    lastName?: string;
    phone: string;
}

export type GetCustomerResponse = CustomerType;

export type RegisterCustomerRequest = Omit<CustomerType, 'id'>;
export type RegisterCustomerResponse = CustomerType;

export type GetCustomersResponse = CustomerType[];

export type UpdateCustomerRequest = CustomerType;
export type UpdateCustomerResponse = CustomerType;
