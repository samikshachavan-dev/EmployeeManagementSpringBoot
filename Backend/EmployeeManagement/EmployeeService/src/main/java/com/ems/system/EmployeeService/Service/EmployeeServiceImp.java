package com.ems.system.EmployeeService.Service;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ems.system.EmployeeService.Dto.EmployeeDto;
import com.ems.system.EmployeeService.Entity.Employee;
import com.ems.system.EmployeeService.Repository.EmployeeRepository;

@Service
public class EmployeeServiceImp implements EmployeeService{

	@Autowired
	private EmployeeRepository repo;
	
	
	@Override
	public List<EmployeeDto> getAllEmployees() {
		return repo.findAll().stream().map(emp->{
			EmployeeDto dto=new EmployeeDto();
			dto.setId(emp.getId());
			dto.setName(emp.getName());
			dto.setDesignation(emp.getDesignation());
			dto.setSalary(emp.getSalary());
			return dto;
		}).toList();
	}

	@Override
	public EmployeeDto getEmployeeById(Long id) {
		Employee emp = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        EmployeeDto dto = new EmployeeDto();
        dto.setId(emp.getId());
        dto.setName(emp.getName());
        dto.setDesignation(emp.getDesignation());
        dto.setSalary(emp.getSalary());

        return dto;
	}

	@Override
	public EmployeeDto createEmployee(EmployeeDto dto) {
		Employee emp = new Employee();
        emp.setName(dto.getName());
        emp.setDesignation(dto.getDesignation());
        emp.setSalary(dto.getSalary());

        Employee saved = repo.save(emp);

        dto.setId(saved.getId());
        return dto;
	}

	@Override
	public EmployeeDto updateEmployee(Long id, EmployeeDto dto) {
		Employee emp = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        emp.setName(dto.getName());
        emp.setDesignation(dto.getDesignation());
        emp.setSalary(dto.getSalary());

        repo.save(emp);

        return dto;
		
	}

	@Override
	public void deleteEmployee(Long id) {
		// TODO Auto-generated method stub
		repo.deleteById(id);
	}

	
	 
	

}
