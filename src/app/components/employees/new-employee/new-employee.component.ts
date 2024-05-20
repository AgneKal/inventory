import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { BirthYearValidatorDirective } from '../../../directives/birth-year-validator.directive';
import { EmployeesService } from '../../../services/employees.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-new-employee',
  standalone: true,
  imports: [FormsModule, CommonModule, BirthYearValidatorDirective],
  templateUrl: './new-employee.component.html',
  styleUrl: './new-employee.component.css',
  animations:[
    trigger("inputFileds",[
      state('normal',style({
        'font-size':'16px',
        'height':'36px'

      })),
      state('focused',style({
        'font-size':'32px',
        'height':'62px'
      })),
      transition('* <=> *',[
        animate(500)
      ])

    ]),
    // Animacija klaidų blokeliams
    trigger("errorBlock",[
      //Rodomas stilius * - bet kokia būsena
      state("*", style({
        'opacity':'1',  
        'heigh':'50px'   
      })),
      // Iš neegzistuojančio į bet kokį egzistuojantį blokelį
      transition("void => *",[
        //Pirmas stilius
        style({
          'opacity':'0',
          'height':'0px'     
        }),
        //Antras stilius, kuris bus pasiektas 0.5s
        animate(500, style({
          'opacity':'0',
          'height':'50px' 
        })),
        //Trečias stilius, bus pasiektas dar po 0.5s (stilius aprašytas būsenoje *)
        animate(500)

      ]),
      //Animacija iš bet kokios egzistuojančios būsenos į neegzistuojančią būseną
      transition("* => void",[
        //Pereiname iš bet kurios buvusios būsenos į šitą, per 0.5s
        animate(500, style({
          'opacity':'0',
          'height':'50px' 
        })),
        //Pereiname į šitą per 0.5s
        animate(500, style({
          'opacity':'0',
          'height':'0px' 
        }))

      ])

    ])
  ]
})


export class NewEmployeeComponent {
  public inputState=['normal','normal','normal','normal','normal'];

  constructor(private employeesService: EmployeesService) {
  }

  public newEmployeeSubmit(f: NgForm){
    this.employeesService.addEmployee(f.form.value).subscribe(()=>{})
  }

  public inputFocus(fieldId:number, state:boolean){
    if (state==true){
      this.inputState[fieldId]='focused';
    }else{
      this.inputState[fieldId]='normal';
    }
  }
}
