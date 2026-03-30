package com.ems.system.EmployeeService.Service;

import java.util.List;

import com.ems.system.EmployeeService.Dto.EmployeeDto;

public interface EmployeeService {
	
	List<EmployeeDto> getAllEmployees();

	EmployeeDto getEmployeeById(Long id);

	EmployeeDto createEmployee(EmployeeDto dto);

	EmployeeDto updateEmployee(Long id, EmployeeDto dto);

	void deleteEmployee(Long id);

	
	

}
