export interface CustomerData {
    id: string,
    email: string,
    firstName: string,
    lastName?: string,
    phone: string
}

export type CustomerInitObj = CustomerData;