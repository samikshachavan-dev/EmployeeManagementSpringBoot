package com.ems.system.EmployeeService.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeDto {

	
	private Long id;
	private String name;
	private String designation;
	private double salary;
}
