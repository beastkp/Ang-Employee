import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudEmployeesService } from 'src/app/service/crud-employees.service';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
})
export class EditEmployeeComponent implements OnInit {
  employee: Employee = {
    id: '',
    name: '',
    email: '',
    phone: 0,
    salary: 0,
    department: '',
  };

  constructor(
    private route: ActivatedRoute,
    private EmpService: CrudEmployeesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        // executed when you get the response
        const id = params.get('id');
        if (id) {
          this.EmpService.getEmployee(id).subscribe({
            next: (response) => {
              this.employee = response;
            },
          });
        }
      },
      error: (error) => {
        //executed when you have an Error
        console.log(error);
      },
    });
  }

  updateEmployee(){
    this.EmpService.updateEmployee(this.employee).subscribe({
      next: (response) => {
        // console.log(response);
        this.router.navigate(['']);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  deleteEmployee(){
    this.EmpService.deleteEmployee(this.employee.id).subscribe({
      next: (response) => {
        // console.log(response);
        this.router.navigate(['']);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
