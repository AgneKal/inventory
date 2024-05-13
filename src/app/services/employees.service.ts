import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http: HttpClient) { }

  public addEmployee(employee: Employee){
    return this.http.post(`https://inventory-inventor-default-rtdb.europe-west1.firebasedatabase.app/employee.json`, employee)
  }

  public loadEmployees(){
    return this.http
      .get<{[key:string]:Employee}>(`https://inventory-inventor-default-rtdb.europe-west1.firebasedatabase.app/employee.json`)
      .pipe (
        map((data):Employee[] => {
          let emp: Employee[] = [];
          for (let e in data){
            emp.push({...data[e], id:e})
          }
          return emp;
        })
      )
  }

}
