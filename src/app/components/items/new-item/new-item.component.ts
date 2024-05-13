import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ItemsService } from '../../../services/items.service';
import { Employee } from '../../../models/employee';
import { EmployeesService } from '../../../services/employees.service';
import { Observable, map } from 'rxjs';

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

  constructor(private itemsService: ItemsService, private employeesService: EmployeesService){
    this.itemForm = new FormGroup({
      'inv_number': new FormControl(null, [Validators.required, Validators.minLength(3), this.validateInvNumber]),
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

  onSubmit(){
    console.log(this.itemForm);
    this.itemsService.addItem(this.itemForm.value).subscribe(()=>{})
    this.itemForm.reset();
    (this.itemForm.get('locations') as FormArray).controls = [
      new FormControl(null, Validators.required)
    ]
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

//   static createUniqueInvNumberValidator(itemsService: ItemsService){
//     return (control: FormControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {

//     this.itemsService.loadItem().pipe(map((data)=>null))
//   }
// }

//   uniqueInvNumber (control: FormControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {

//     return this.itemsService.loadItem().pipe(map((data)=>null))

//     // const promise = new Promise<ValidationErrors | null> ((resolve, reject) => {
//     //   this.itemsService.loadItem().subscribe((data)=> {
//     //     resolve
//     //   });
//     // });
//     // return promise;
//   }


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