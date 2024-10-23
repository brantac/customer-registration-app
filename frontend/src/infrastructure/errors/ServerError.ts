export class ServerError extends Error {
    constructor(message = "Erro no servidor", public details?: string) {
        super(message);
        this.name = "ServerError";
    }
}