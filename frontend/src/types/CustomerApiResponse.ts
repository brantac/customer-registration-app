export interface CustomerType {
    id?: string;
    email?: string;
    firstName: string;
    lastName?: string;
    phone: string;
}

// type CustomerTypeNonRequiredFields = "id" | "email" | "lastName";

export type GetCustomerRequest = Required<Pick<CustomerType, 'id'>>;
export type GetCustomerResponse = Omit<CustomerType, "id"> & Required<Pick<CustomerType, "id">>;

export type RegisterCustomerRequest = CustomerType;
export type RegisterCustomerResponse = GetCustomerResponse;

export type GetCustomersResponse = GetCustomerResponse[];


export type UpdateCustomerRequest = CustomerType & GetCustomerRequest;
export type UpdateCustomerResponse = GetCustomerResponse;
