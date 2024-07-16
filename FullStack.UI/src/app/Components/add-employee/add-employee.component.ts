import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { CrudEmployeesService } from 'src/app/service/crud-employees.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  addEmployeeRequest: Employee = {
    id: '',
    name: '',
    email: '',
    phone: 0,
    salary: 0,
    department: ''
  }

  constructor(private EmpService: CrudEmployeesService, private router: Router) { }

  ngOnInit(): void {
  }

  addEmployee(){
    this.EmpService.createEmployee(this.addEmployeeRequest).subscribe({
      next: (employee) =>{
        console.log(employee);
        this.router.navigate(['']);
      }
    })
    console.log(this.addEmployeeRequest);
  }
}
