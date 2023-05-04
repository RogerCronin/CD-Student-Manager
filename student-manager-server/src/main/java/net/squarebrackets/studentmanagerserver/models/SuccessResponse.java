package net.squarebrackets.studentmanagerserver.models;

import lombok.Getter;

@Getter
public class SuccessResponse {
    boolean success;
    String message;

    public SuccessResponse(boolean success) {
        this.success = success;
    }

    public SuccessResponse(boolean success, String message) {
        this(success);
        this.message = message;
    }

    @Override
    public String toString() {
        return String.format(
            "SuccessResponse{success=%b, message=%s}",
            success,
            message
        );
    }
}
