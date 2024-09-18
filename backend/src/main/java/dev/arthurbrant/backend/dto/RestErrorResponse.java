package dev.arthurbrant.backend.dto;

import org.springframework.http.HttpStatus;

public record RestErrorResponse(String message, String details, HttpStatus status) {

}
