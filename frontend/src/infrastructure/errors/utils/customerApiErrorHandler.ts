import { CustomerNotFoundError } from "../customer-api/CustomerNotFoundError";
import { NetworkError } from "../NetworkError";
import { ServerError } from "../ServerError";

export function customerApiErrorHandler (error: unknown) {
    if (
        error instanceof CustomerNotFoundError ||
        error instanceof ServerError
    ) 
    {
        throw error;
    }
    throw new NetworkError();
}