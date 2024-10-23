export type CustomerType = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
}

export type CustomerResponseType = Omit<CustomerType, 'email'> & Partial<Pick<CustomerType, 'email'>>;

export type RegisterCustomerRequestType = Omit<CustomerType, 'email' | 'id'> & Partial<Pick<CustomerType, 'email' | 'id'>>;
export type RegisterCustomerResponseType = CustomerResponseType;

export type GetAllCustomersResponse = CustomerResponseType[];
