export class CustomerAlreadyExistsError extends Error {
    constructor(message = "Cadastro de cliente já existe", public details: string, public status: string) {
        super(message);
        this.name = "CustomerAlreadyExistsError";
    }
}