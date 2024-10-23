import { CustomerAlreadyExistsError } from "../customer-api/CustomerAlreadyExistsError";
import { CustomerNotFoundError } from "../customer-api/CustomerNotFoundError";
import { NetworkError } from "../NetworkError";
import { ServerError } from "../ServerError";

export type CustomerApiError = 
    | CustomerNotFoundError 
    | ServerError 
    | CustomerAlreadyExistsError 
    | NetworkError;

export function customerApiErrorHandler(error: unknown): CustomerApiError {
    if (
        error instanceof CustomerNotFoundError ||
        error instanceof CustomerAlreadyExistsError ||
        error instanceof ServerError
    ) {
        return error;
    }
    else if (error instanceof TypeError){
        return new NetworkError(`Erro na requisição`);
    }
    else {
        return new Error("Erro inexperado");
    }
}