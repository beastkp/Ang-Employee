import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class CrudEmployeesService {
  private _url: string = 'http://localhost:3000/Employees/';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http
      .get<Employee[]>(this._url)
      .pipe(catchError(this.handleError<Employee[]>()));
  }

  createEmployee(employee: Employee): Observable<Employee> {
    return this.http
      .post<Employee>(this._url, employee)
      .pipe(catchError(this.singleError<Employee>()));
  }

  getEmployee(id: string): Observable<Employee> {
    return this.http
      .get<Employee>(this._url + id)
      .pipe(catchError(this.singleError<Employee>()));
  }

  updateEmployee(employee:Employee){
    return this.http
    .put<Employee>(this._url + employee.id, employee)
    .pipe(catchError(this.singleError<Employee>()));
  }

  deleteEmployee(id:string){
    return this.http
    .delete<Employee>(this._url + id)
    .pipe(catchError(this.singleError<Employee>()));
  }

  handleError<T>() {
    //The <T> syntax in TypeScript denotes a generic type. Generics provide a way to define functions, classes, or interfaces that work with multiple types without sacrificing type safety. They allow you to create reusable and flexible code components that can work with any type specified at the time of use.

    return (error: HttpErrorResponse): Observable<T> => {
      return throwError(error.message || 'server Error');
    };
  }

  singleError<T>() {
    return (error: HttpErrorResponse): Observable<T> => {
      return throwError(error.message || 'server Error');
    };
  }
}
