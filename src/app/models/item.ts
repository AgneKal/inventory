import { Employee } from "./employee";

export class Item {
    public id: string|null=null;
    public inv_number: number|null = null;
    public name: string|null = null;
    public type: string|null = null;
    public responsible_employee_id: string|null = null;
    public responsible_employee: Employee|null = null;
    public locations: string[] = [];
}