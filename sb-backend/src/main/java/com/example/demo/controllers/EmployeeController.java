package com.example.demo.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.exception.ResourceAlreadyExiststsException;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.Employee;
import com.example.demo.repository.EmployeeRepository;

@CrossOrigin(origins = "http://localhost:3000") //@CrossOrigin - for any client
@RestController
@RequestMapping("/api/v1")
public class EmployeeController {
	
	@Autowired
	private EmployeeRepository employeeRepository;
	
	//get all employees
	@GetMapping("/employees")
	public List<Employee> getAllEmployees(){
		return employeeRepository.findAll();
	}
	
	//add new employee with unique mail
	@PostMapping("/employees")
	public Employee addEmployee(@RequestBody Employee employee) {
		employeeRepository.findByEmail(employee.getEmail()).ifPresent((e)->{
			throw new ResourceAlreadyExiststsException("Email already exists : "+e.getEmail());
		});
		//employeeRepository.findByEmail
		return employeeRepository.save(employee);
	}
	
	//get employee by id
	@GetMapping("/employees/{id}")
	public ResponseEntity<Employee> getEmployeeById(@PathVariable("id") long employeeId) {
		Employee employee=employeeRepository.findById(employeeId)
				.orElseThrow(()-> new ResourceNotFoundException("Requsted emoloyee doesn't exists. id : "+employeeId));
		return ResponseEntity.ok(employee);
	}
	
	//update employee details
	@PutMapping("/employees/{id}")
	public ResponseEntity<Employee> updateEmployeeDetails(@PathVariable("id")long id,@RequestBody Employee updateToEmployee){
		employeeRepository.findById(id)
				.orElseThrow(()-> new ResourceNotFoundException("Requsted emoloyee doesn't exists.\n id : "+id));
		employeeRepository.findByEmail(updateToEmployee.getEmail()).ifPresent((e)->{
			if(e.getId() != id)
				throw new ResourceAlreadyExiststsException("Email already exists : "+e.getEmail());
		});
		updateToEmployee.setId(id);
		Employee employee=employeeRepository.save(updateToEmployee);
		return ResponseEntity.ok(employee);

	}
	
	@DeleteMapping("/employees/{id}")
	public ResponseEntity<Map<String,Boolean>> deleteEmployee(@PathVariable("id") long id) {
		employeeRepository.findById(id)
		.orElseThrow(()-> new ResourceNotFoundException("Requsted emoloyee doesn't exists.\n id : "+id));
		employeeRepository.deleteById(id);
		Map <String,Boolean> res =new HashMap<>();
		res.put("Deleted",true);
		return ResponseEntity.ok(res);
	}
}
