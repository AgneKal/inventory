import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NewEmployeeComponent } from './components/employees/new-employee/new-employee.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NewEmployeeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'inventory';
}
