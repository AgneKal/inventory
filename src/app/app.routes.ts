import { Routes } from '@angular/router';
import { NewEmployeeComponent } from './components/employees/new-employee/new-employee.component';
import { NewItemComponent } from './components/items/new-item/new-item.component';
import { ListItemsComponent } from './components/items/list-items/list-items.component';

export const routes: Routes = [
    {path: 'employees/add', component: NewEmployeeComponent},
    {path: 'items/add', component: NewItemComponent},
    {path: 'items/list', component: ListItemsComponent}
];
