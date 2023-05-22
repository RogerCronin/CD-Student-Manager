package net.squarebrackets.studentmanagerserver.configurations;

import com.google.firebase.FirebaseApp;
import com.google.firebase.auth.FirebaseAuth;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

// autowiring configurations for FirebaseAuth
@Configuration
public class FirebaseAuthConfig {
    private final FirebaseApp firebaseApp;

    @Autowired
    public FirebaseAuthConfig(FirebaseApp firebaseApp) {
        this.firebaseApp = firebaseApp;
    }

    @Bean
    public FirebaseAuth getFirebaseAuth() {
        return FirebaseAuth.getInstance(firebaseApp);
    }
}
