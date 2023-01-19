package com.ssafy.marmar.config;

import org.springframework.boot.autoconfigure.condition.ConditionalOnWebApplication;
import org.springframework.boot.autoconfigure.security.ConditionalOnDefaultWebSecurity;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@EnableWebSecurity
@Configuration
@ConditionalOnDefaultWebSecurity
@ConditionalOnWebApplication(type = ConditionalOnWebApplication.Type.SERVLET)
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

//    @Bean
//    DaoAuthenticationProvider authenticationProvider() {
//        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
//        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
//        daoAuthenticationProvider.setUserDetailsService(this.ssafyUserDetailService);
//        return daoAuthenticationProvider;
//    }

    @Bean
    @Order(SecurityProperties.BASIC_AUTH_ORDER)
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.authorizeRequests()
                //.antMatchers("/api/student").authenticated()
                .anyRequest().permitAll();

        return http.build();
    }

//    @Bean
//    @Order(SecurityProperties.BASIC_AUTH_ORDER)
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//        http
//                .httpBasic().disable()
//                .csrf().disable()
//                .antMatchers("/api/v1/users/me").authenticated()       //인증이 필요한 URL과 필요하지 않은 URL에 대하여 설정
//                .antMatchers(HttpMethod.PATCH,"/api/v1/users/**").authenticated()
//                .antMatchers(HttpMethod.DELETE,"/api/v1/users/**").authenticated()
//                .anyRequest().permitAll()
//                .and().cors();
//        return http.build();
//    }

//    @Bean
//    @Order(SecurityProperties.BASIC_AUTH_ORDER)
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//        http
//                .csrf().disable()
//                .authorizeRequests()
//                .antMatchers("/api/student").authenticated()       //인증이 필요한 URL과 필요하지 않은 URL에 대하여 설정
////                .antMatchers(HttpMethod.PATCH,"/api/student/**").authenticated()
////                .antMatchers(HttpMethod.DELETE,"/api/student/**").authenticated()
//                .anyRequest().permitAll()
//                .and().cors();
//
//        return http.build();
//    }
}

