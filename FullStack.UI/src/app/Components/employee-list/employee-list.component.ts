import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { CrudEmployeesService } from 'src/app/service/crud-employees.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  public employees: Employee[] = [];

  constructor(private EmpService: CrudEmployeesService) {}

  ngOnInit(): void {
    this.EmpService.getEmployees().subscribe({
      next: (data: Employee[]) => {
        //callback function that is executed when you get the response and gives the response of type Employee
        this.employees = data;
        console.log(this.employees);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
