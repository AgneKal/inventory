import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ItemsService } from '../../../services/items.service';
import { Employee } from '../../../models/employee';
import { EmployeesService } from '../../../services/employees.service';

@Component({
  selector: 'app-new-item',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-item.component.html',
  styleUrl: './new-item.component.css'
})

export class NewItemComponent {
  public itemForm: FormGroup;
  public employees: Employee[]=[];
  // public lastNumber: number = 0;

  constructor(private itemsService: ItemsService, private employeesService: EmployeesService){
    this.itemForm = new FormGroup({
      // vienoj null apčioj this.lastNumber
      'inv_number': new FormControl (null,
        {
          validators: [Validators.required, this.validateInvNumber],
          asyncValidators:[ItemsService.createUniqueInvNumberValidator(itemsService)]
        }
      ),

      'name': new FormControl(null, [Validators.required, Validators.minLength(3)]),
      'type': new FormControl(null),
      'responsible_employee_id': new FormControl(null, Validators.required),
      'locations': new FormArray([
        new FormControl(null, Validators.required)
      ]),
    });
    this.employeesService.loadEmployees().subscribe((data)=>{
      this.employees = data;
    })
  }

  // private resetForm(){
  //   this.itemsService.getLastInvNumber().subscribe((n)=>{
  //     this.lastNumber=n;
  //     (this.itemForm.get('inv_number') as FormControl).setValue(n);
  //   });
  // }

  onSubmit(){
    console.log(this.itemForm.value);
    this.itemsService.addItem(this.itemForm.value).subscribe(()=>{
      this.itemForm.reset();
      (this.itemForm.get('locations') as FormArray).controls=[
        new FormControl(null, Validators.required)
      ];
      // this.resetForm();
    })
  }

  validateInvNumber(control: FormControl): ValidationErrors|null {
    let value = control.value;
    let pattern = /^[A-Z]{3}[0-9]{5}$/;

    if (pattern.test(value)) {
      return null;
    } else {
      return {error: 'Klaida'}
    }
  }

  get locations() {
    return (this.itemForm.get('locations') as FormArray).controls;
  }

  public addLocationField(){
    const field = new FormControl(null, Validators.required);
    (this.itemForm.get('locations') as FormArray).push(field);

  }

  public removeLocationField() {
    (this.itemForm.get('locations') as FormArray).removeAt(-1)
  }
}