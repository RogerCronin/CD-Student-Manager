package net.squarebrackets.studentmanagerserver.services;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {
    private final FirebaseAuth firebaseAuth;

    @Autowired
    public AuthenticationServiceImpl(FirebaseAuth firebaseAuth) {
        this.firebaseAuth = firebaseAuth;
    }

    /**
     * Verifies a user ID token is an admin, i.e. registered user with FirebaseAuth
     *
     * @param idToken token to check against
     * @return        boolean value whether the token is an admin
     */
    @Override
    public boolean tokenHasAdminPrivileges(String idToken) {
        try {
            // throws FirebaseAuthException on failure
            firebaseAuth.verifyIdToken(idToken);
            return true;
        } catch(FirebaseAuthException ex) {
            return false;
        }
    }
}