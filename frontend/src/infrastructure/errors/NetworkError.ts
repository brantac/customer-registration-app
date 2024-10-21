export class NetworkError extends Error {
    constructor(message = "Erro na requisição") {
        super(message);
        this.name = "NetworkError";
    }
}