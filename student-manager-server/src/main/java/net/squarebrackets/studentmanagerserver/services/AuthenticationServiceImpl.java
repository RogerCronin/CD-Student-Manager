package net.squarebrackets.studentmanagerserver.services;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {
    ArrayList<String> adminUids = new ArrayList<>() {{
        add("0Rv6ufOXWdW1ZyGb6sW5wtTqx6W2");
    }};

    @Override
    public boolean tokenHasAdminPrivileges(String idToken) {
        try {
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);
            String uid = decodedToken.getUid();
            return uidHasAdminPrivileges(uid);
        } catch(FirebaseAuthException ex) {
            System.err.println("Authentication error, passed bad token?");
            ex.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean uidHasAdminPrivileges(String uid) {
        return adminUids.contains(uid);
    }
}
