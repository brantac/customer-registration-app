import type { CustomerData, CustomerInitObj } from "@/types/CustomerData";


export class Customer {
    private readonly _id: string;
    private readonly _email: string;
    private readonly _firstName: string;
    private readonly _lastName?: string;
    private readonly _phone: string;

    constructor(init: CustomerInitObj) {
        this._id = init.id;
        this._firstName = init.firstName;
        this._lastName = init.lastName;
        this._email = init.email;
        this._phone = init.phone;
    }

    public data(): CustomerData {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            phone: this.phone,
        }
    }

    get firstName() {
        return this._firstName;
    }
    
    get lastName(): string | undefined {
        return this._lastName;
    }
    
    get email(): string {
        return this._email;
    }
    
    get phone() {
        return this._phone;
    }

    get id(): string {
        return this._id;
    }
    
}
