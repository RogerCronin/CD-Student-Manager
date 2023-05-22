package net.squarebrackets.studentmanagerserver.services;

public interface AuthenticationService {
    boolean tokenHasAdminPrivileges(String idToken);
}
