import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ItemsService } from '../../../services/items.service';
import { Employee } from '../../../models/employee';
import { EmployeesService } from '../../../services/employees.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-new-item',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-item.component.html',
  styleUrl: './new-item.component.css',
  animations: [
    trigger('caption', [
      state('normal', style({
        'color':'#000000'
      })),
      state('clicked1', style({
        'color':'#00ff00'
      })),
      state('clicked2', style({
        'color':'#ff0000'
      })),
      transition('* <=> *', [
        animate(1000)
      ]),
    ]),
    trigger('locationInput',[
      state("*", style({
        transform:"translateX(0px) translateY(0px)",
        height:'38px'
      })),
      transition("void => *",[
        //Aukštis 0 , atvaizduojamas už ekrano ribų
        style({
          height:'0px',
          transform:"translateX(-2000px) translateY(300px)"
        }),
        //Išplečiame laisvą vietą iš aukščio
        animate(500, style({
          height:'38px',
          transform:"translateX(-2000px) translateY(300px)"
        })),
        //Įvažiuojame į tinkmą vietą
        animate(1000)
      ]),
      transition("* => void",[
        //Aukštis 0 , atvaizduojamas už ekrano ribų

        animate(1000, style({
          height:'38px',
          transform:"translateX(2000px) translateY(300px)"
        })),
        //Įvažiuojame į tinkmą vietą
        animate(500, style({
          height:'0px',
          transform:"translateX(2000px) translateY(300px)"
        }) 
        )
      ])
    ])
  ]
})

export class NewItemComponent {
  public itemForm: FormGroup;
  public employees: Employee[]=[];
  // public lastNumber: number = 0;

  public captionState = 'normal';

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

  public captionClick() {
    switch (this.captionState) {
      case 'normal':
        this.captionState = 'clicked1';
        break;
      case 'clicked1':
        this.captionState = 'clicked2';
        break;
      case 'clicked2':
        this.captionState = 'normal';
        break;
    }
    // this.captionState = (this.captionState === 'normal')?'clicked':'normal';
  }
}