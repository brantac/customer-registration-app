import type { Customer } from "@/domain/entities/Customer";

export type CustomerType = Omit<Customer, 'phone'> & Partial<Pick<Customer, 'phone'>>;

export type RegisterCustomerResponse = CustomerType;

export type GetAllCustomersResponse = CustomerType[];
