package com.ems.system.EmployeeService.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ems.system.EmployeeService.Dto.EmployeeDto;
import com.ems.system.EmployeeService.Service.EmployeeService;

@RestController
@RequestMapping("/employees")

@CrossOrigin(origins = "http://localhost:5173")
public class EmployeeController {

	@Autowired
	private EmployeeService service;
	
	@PostMapping
	public EmployeeDto  createEmployee(@RequestBody EmployeeDto dto) {
		return service.createEmployee(dto);
	}
	
	
	@GetMapping
	public List<EmployeeDto> getAllEmployees(){
		return service.getAllEmployees();
	}
	
	@GetMapping("/{id}")
	public EmployeeDto getEmployeeById(@PathVariable Long id) {
		return service.getEmployeeById(id);
	}
	
	 @PutMapping("/{id}")
	    public EmployeeDto update(@PathVariable Long id, @RequestBody EmployeeDto dto) {
	        return service.updateEmployee(id, dto);
	    }

	    @DeleteMapping("/{id}")
	    public String delete(@PathVariable Long id) {
	        service.deleteEmployee(id);
	        return "Deleted successfully";
	    }
	
	
	
}
