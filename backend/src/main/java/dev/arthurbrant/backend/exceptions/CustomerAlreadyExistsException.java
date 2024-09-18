package dev.arthurbrant.backend.exceptions;

public class CustomerAlreadyExistsException extends RuntimeException {
    public CustomerAlreadyExistsException() {
        super("Cliente já existe");
    }

    public CustomerAlreadyExistsException(String message) {
        super(message);
    }
}
