package dev.arthurbrant.backend.infra;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import dev.arthurbrant.backend.dto.RestErrorResponse;
import dev.arthurbrant.backend.exceptions.CustomerAlreadyExistsException;
import dev.arthurbrant.backend.exceptions.CustomerNotFoundException;

@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(CustomerNotFoundException.class)
    private ResponseEntity<RestErrorResponse> customerNotFoundExceptionHandler(CustomerNotFoundException exception) {
        RestErrorResponse response = new RestErrorResponse(
            "Cliente não encontrado",
            exception.getMessage(),
            HttpStatus.NOT_FOUND
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    @ExceptionHandler(CustomerAlreadyExistsException.class)
    private ResponseEntity<RestErrorResponse> customerAlreadyExistsExceptionHandler(CustomerAlreadyExistsException exception) {
        RestErrorResponse response = new RestErrorResponse(
            "Cliente já existe",
            exception.getMessage(),
            HttpStatus.CONFLICT
        );
        return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
    }
}
