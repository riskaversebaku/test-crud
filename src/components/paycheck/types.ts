export interface Dependent {
    id: number;
    name: string;
}

export interface EmployeeProps extends Dependent {
    dependents: Array<Dependent>
}