import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { BirthYearValidatorDirective } from '../../../directives/birth-year-validator.directive';

@Component({
  selector: 'app-new-employee',
  standalone: true,
  imports: [FormsModule, CommonModule, BirthYearValidatorDirective],
  templateUrl: './new-employee.component.html',
  styleUrl: './new-employee.component.css'
})
export class NewEmployeeComponent {


  newEmployeeSubmit(f: NgForm){
    console.log(f.form.value);

  }
}
