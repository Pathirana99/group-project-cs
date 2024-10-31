package com.example.testing.configuration;

import com.example.testing.entity.LoginUser;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {
   @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
       httpSecurity.authorizeHttpRequests((requests)->requests
               .requestMatchers("/loginuser/saveLoginUser").hasRole("USER")
               .requestMatchers("/owner/saveOwner").hasRole("OWNER")
       ).httpBasic(Customizer.withDefaults());
       return httpSecurity.build();
    }

    public UserDetailsService userDetailsService() {
        UserDetails user = User.withUserDetails()
                .username("user")
                .password("user_")
    }
}
