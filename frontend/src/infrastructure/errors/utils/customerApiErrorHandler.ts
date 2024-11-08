import { CustomerAlreadyExistsError } from "../customer-api/CustomerAlreadyExistsError";
import { CustomerNotFoundError } from "../customer-api/CustomerNotFoundError";
import { NetworkError } from "../NetworkError";
import { ServerError } from "../ServerError";

// Include: 400 BAD REQUEST
export type CustomerApiError = 
    | CustomerNotFoundError // 404: NOT FOUND
    | ServerError // 500: SERVER ERROR
    | CustomerAlreadyExistsError // 409: CONFLICT
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