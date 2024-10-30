package com.example.HiMade.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.servlet.http.HttpSession;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, CustomAuthenticationProvider customAuthenticationProvider) throws Exception {
        http
                .csrf().disable()
                .authorizeRequests()
                .antMatchers("/css/**", "/uploads/**", "/img/**", "/bundle/**").permitAll()
                .antMatchers("/**").permitAll()  // 모든 경로에 접근 허용 (임시 설정)
                //.antMatchers("/userMain.user").permitAll() // 로그인 필요없이 접근 가능한 요청
                //.anyRequest().authenticated()  // 그 외 요청은 로그인 필요
                .and()
                .formLogin()
                .loginPage("/UserLoginPage.user")
                    .permitAll()
                    .loginProcessingUrl("/login")
                    .usernameParameter("userId")
                    .passwordParameter("userPw")
                    .defaultSuccessUrl("/UserMain.user", true) // 로그인 성공 후 이동할 페이지
                    .failureUrl("/UserLoginPage.user?error=true")
                .and()
                .logout()
                    .logoutUrl("/logout")
                    .permitAll()
                    .logoutSuccessUrl("/UserLoginPage.user")
                    .invalidateHttpSession(true)
                    .deleteCookies("JSESSIONID")
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED) // 기본 세션 관리 방식
                .and()
                .authenticationProvider(customAuthenticationProvider);
        return http.build();
    }

}
