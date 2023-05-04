package net.squarebrackets.studentmanagerserver.controllers;

import net.squarebrackets.studentmanagerserver.models.SuccessResponse;
import net.squarebrackets.studentmanagerserver.services.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @Autowired
    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @GetMapping("{token}")
    public ResponseEntity<SuccessResponse> validateToken(@PathVariable("token") String token) {
        boolean isAdmin = authenticationService.tokenHasAdminPrivileges(token);
        if(!isAdmin) {
            return new ResponseEntity<>(
                new SuccessResponse(false, "Invalid token given"),
                HttpStatus.UNAUTHORIZED
            );
        } else {
            return new ResponseEntity<>(new SuccessResponse(true), HttpStatus.ACCEPTED);
        }
    }
}
