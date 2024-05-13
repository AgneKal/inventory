import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ItemsService } from '../../../services/items.service';
import { Item } from '../../../models/item';
import { EmployeesService } from '../../../services/employees.service';
import { Employee } from '../../../models/employee';
import { map } from 'rxjs';

@Component({
  selector: 'app-list-items',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-items.component.html',
  styleUrl: './list-items.component.css'
})

export class ListItemsComponent {
  public items:Item[]=[];
  public employees: Employee[]=[];

  constructor(private itemsService:ItemsService, private employeesService:EmployeesService){
    this.employeesService
      .loadEmployees()
      .subscribe((data)=>{
        this.employees=data;
          this.itemsService
          .loadItems()
          .pipe(
            map((data)=>{
              data.forEach((item,itemId)=>{
                this.employees.forEach((employee, employeeId)=>{
                  if (item.responsible_employee_id==employee.id){
                    data[itemId].responsible_employee=employee;
                  }
                })
              });
              return data;
            }
          ))
          .subscribe((data)=>{
            this.items=data;
          });
        });
    }
}
