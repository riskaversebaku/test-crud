import React, { useState, useCallback, useEffect } from 'react';
import {useDeleteData, useGetData, usePostData, usePutData} from './paycheckQueries';
import { Dependent, EmployeeProps } from './types';
import { Employee } from './employee';

export const Paycheck: React.FC = () => {
    const { data, error, isLoading, refetch } = useGetData();
    const { mutateAsync: postData } = usePostData();
    const { mutateAsync: putData } = usePutData();
    const { mutateAsync: deleteData } = useDeleteData();
    const [isEditing, setIsEditing] = useState<number | null>(null);

    const [dependents, setDependents] = useState(data?.find(({ id }) => id === isEditing)?.dependents);
    const [newEmployeeName, setNewEmployeeName] = useState('');

    useEffect(() => {
        if(!dependents) {
            setDependents(data?.find(({ id }) => id === isEditing)?.dependents)
        }
    }, [data, dependents, isEditing])

    const handleSave = async () => {
        const empl = data?.find(({ id }) => id === isEditing)

        if(empl) {
            await putData({ id: empl.id, data: { ...empl, dependents: (dependents || []) } })
            await refetch();
            setIsEditing(null);
        }
    };

    const handleSetValueDependent = (value: EmployeeProps['dependents']) => {
        setDependents(value);
    }

    const handleAddDependent = () => {
        setDependents([...(dependents || []), { id: Date.now(), name: '' }]);
    };

    const handleAddEmployee = useCallback(async () => {
        const newEmployee: EmployeeProps = {
            id: Date.now(),
            name: newEmployeeName,
            dependents: []
        };
        await postData(newEmployee);
        await refetch();
        setNewEmployeeName('');
    }, [newEmployeeName, postData, refetch]);

    const handleDeleteEmployee = useCallback(async (id: number) => {
        await deleteData(id);
        await refetch();
    }, [deleteData, refetch]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const calculateCost = (name: string, dependents: Array<Dependent>) => {
        const employeeCost = name.startsWith('A') ? 1000 * 0.9 : 1000;
        const dependentsCost = dependents.reduce((total, dep) => {
            return total + (dep.name.startsWith('A') ? 500 * 0.9 : 500);
        }, 0);
        return (employeeCost + dependentsCost) / 26;
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl mb-4">Employee Benefits</h1>
            <div className="mb-4">
                <input
                    type="text"
                    value={newEmployeeName}
                    onChange={(e) => setNewEmployeeName((e.target.value))}
                    className="border border-blue-500 mr-2"
                />
                <button onClick={handleAddEmployee} className="bg-blue-500 text-white py-2 px-4 rounded">Add Employee</button>
            </div>
            {data?.map((emp) => (
                <Employee handleSave={handleSave} isEditing={isEditing} key={emp.id} employee={emp} dependents={dependents} onDelete={handleDeleteEmployee} handleAddDependent={handleAddDependent} handleSetValueDependent={handleSetValueDependent} onEdit={(val) => setIsEditing(val)} />
            ))}
            <div className="mt-4">
                <h2>Total Cost Per Paycheck:</h2>
                <ul>
                    {data?.map((emp) => (
                        <li key={emp.id}>
                            {emp.name}: ${calculateCost(emp.name, emp.dependents).toFixed(2)}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
};
