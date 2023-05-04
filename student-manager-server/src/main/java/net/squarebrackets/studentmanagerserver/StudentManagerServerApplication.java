package net.squarebrackets.studentmanagerserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class StudentManagerServerApplication {
	public static void main(String[] args) {
		SpringApplication.run(StudentManagerServerApplication.class, args);
	}
}
