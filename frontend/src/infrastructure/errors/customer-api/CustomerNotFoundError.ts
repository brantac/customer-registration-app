export class CustomerNotFoundError extends Error {
    constructor(message = "Cliente não encontrado", public details: string) {
        super(message);
        this.name = "CustomerNotFoundError";
    }
}