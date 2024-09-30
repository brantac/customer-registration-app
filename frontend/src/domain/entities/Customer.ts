export class Customer {
    private _id: string;
    private _firstName: string;
    private _lastName: string;
    private _email: string;

    constructor(firstName: string, lastName: string, email: string, id = '') {
        this._firstName = firstName;
        this._lastName = lastName;
        this._email = email;
        this._id = id;
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
    
    get id() {
        return this._id;
    }

    set id(id: string) {
        this._id = id;
    }
    
}