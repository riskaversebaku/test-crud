import { EmployeeProps } from "./types";

const headers = {
    'Content-Type': 'application/json',
}

export const getData = async (): Promise<Array<EmployeeProps>> => {
    const response = await fetch('/api/example');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export const postData = async (data: EmployeeProps) => {
    const response = await fetch('/api/example', {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export const putData = async (id: EmployeeProps['id'], data: EmployeeProps): Promise<Array<EmployeeProps>> => {
    const response = await fetch(`/api/example/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export const deleteData = async (id: EmployeeProps['id']) => {
    const response = await fetch(`/api/example/${id}`, {
        method: 'DELETE',
        headers,
        body: JSON.stringify({ id }),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}