package dev.arthurbrant.backend.exceptions;

public class CustomerNotFoundException extends RuntimeException {
    public CustomerNotFoundException() { super("Cliente não encontrado"); }
    
    public CustomerNotFoundException(String message) { super(message); }
}
