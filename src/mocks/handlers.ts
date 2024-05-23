import { http, HttpResponse, StrictRequest } from 'msw'
import { EmployeeProps } from '../components/paycheck/types';

let employees = [
    {
        id: 1,
        name: 'Alice',
        dependents: [{ id: 1, name: 'Alan' }]
    },
    {
        id: 2,
        name: 'Bob',
        dependents: [{ id: 2, name: 'Bobby' }]
    }
];

export const handlers = [
    http.get('/api/example', () => {
        return HttpResponse.json(employees)
    }),
    http.post('/api/example', async ({ request }: { request: StrictRequest<EmployeeProps> }) => {
        const employee = await request.json()
        employees.push(employee);
        return HttpResponse.json(employees, { status: 201 })
    }),
    http.put('/api/example/:id', async ({ request }: { request: StrictRequest<EmployeeProps> }) => {
        const employee = await request.json()
        employees = employees.map(e => e.id === employee.id ? employee : e)
        return HttpResponse.json(employees)
    }),
    http.delete('/api/example/:id', async ({ request }: { request: StrictRequest<EmployeeProps> }) => {
        const employee = await request.json()
        employees = employees.filter(e => e.id !== employee.id)
        return HttpResponse.json(employees)
    })
]