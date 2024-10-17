export class Customer {
    private _id: string;
    private _firstName: string;
    private _lastName: string;
    private _email: string;
    private _phone: string;

    constructor(firstName: string, lastName: string, email: string, id = '', phone: string) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._email = email;
        this._id = id;
        this._phone = phone;
    }

    get firstName() {
        return this._firstName;
    }

    set firstName(firstName: string) {
        this._firstName = firstName;
    }
    
    get lastName() {
        return this._lastName;
    }

    set lastName(lastName: string) {
        this._lastName = lastName;
    }
    
    get email() {
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

    get id() {
        return this._id;
    }

    set id(id: string) {
        this._id = id;
    }
    
}
