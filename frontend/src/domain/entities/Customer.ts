interface CustomerInitObj {
    id?: string,
    email?: string,
    firstName: string,
    lastName?: string,
    phone: string
}

export class Customer {
    private _id?: string;
    private _email?: string;
    private _firstName: string;
    private _lastName?: string;
    private _phone: string;

    constructor(init: CustomerInitObj) {
        this._id = init.id;
        this._firstName = init.firstName;
        this._lastName = init.lastName;
        this._email = init.email;
        this._phone = init.phone;
    }

    get firstName() {
        return this._firstName;
    }

    set firstName(firstName: string) {
        this._firstName = firstName;
    }
    
    get lastName(): string | undefined {
        return this._lastName;
    }

    set lastName(lastName: string) {
        this._lastName = lastName;
    }
    
    get email(): string | undefined {
        return this._email;
    }

    set email(email: string) {
        this._email = email;
    }
    
    get phone() {
        return this._phone;
    }

    set phone(phone: string) {
        this._phone = phone;
    }

    get id(): string | undefined {
        return this._id;
    }

    set id(id: string) {
        this._id = id;
    }
    
}
