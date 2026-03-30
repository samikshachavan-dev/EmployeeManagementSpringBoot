package com.ems.system.EmployeeService.Configuration;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.ems.system.EmployeeService.Security.JwtFilter;
import com.ems.system.EmployeeService.Security.JwtUtil;

@Configuration
public class FilterConfig {

	 @Bean
	    public FilterRegistrationBean<JwtFilter> jwtFilter(JwtUtil jwtUtil) {

	        FilterRegistrationBean<JwtFilter> registration = new FilterRegistrationBean<>();

	        // create manually
	        registration.setFilter(new JwtFilter(jwtUtil));

	        registration.addUrlPatterns("/employees/*");

	        return registration;
	    }
}
