package net.squarebrackets.studentmanagerserver.configurations;

import com.google.cloud.firestore.Firestore;
import com.google.firebase.FirebaseApp;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FirebaseFirestoreConfig {
    private final FirebaseApp firebaseApp;

    @Autowired
    public FirebaseFirestoreConfig(FirebaseApp firebaseApp) {
        this.firebaseApp = firebaseApp;
    }

    @Bean
    public Firestore getFirebaseFirestore() {
        return FirestoreClient.getFirestore(firebaseApp);
    }
}
