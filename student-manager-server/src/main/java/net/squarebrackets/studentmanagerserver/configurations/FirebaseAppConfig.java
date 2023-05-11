package net.squarebrackets.studentmanagerserver.configurations;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.FileInputStream;
import java.io.IOException;

@Configuration
public class FirebaseAppConfig {
    private static final String PATH_TO_CONFIG = "./secrets/admin-sdk-secrets.json";

    @Bean
    public FirebaseApp createFirebaseApp() throws IOException {
        try(FileInputStream serviceAccount = new FileInputStream(PATH_TO_CONFIG)) {
            FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build();
            return FirebaseApp.initializeApp(options);
        } catch(IOException ex) {
            System.err.println("Error accessing " + PATH_TO_CONFIG);
            ex.printStackTrace();
        }
        return null;
    }
}
