import React, { useState } from 'react';
import type { EmployeeProps } from "./types";
import { useGetData, usePutData } from "./paycheckQueries";

interface Props {
    employee: EmployeeProps;
    onDelete: (id: number) => void;
    onSave?: ({ id, data }: { id: EmployeeProps['id'], data: EmployeeProps }) => Promise<Array<EmployeeProps>>;
}

export const Employee: React.FC<Props> = ({ employee, onDelete, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(employee.name);
    const [dependents, setDependents] = useState(employee.dependents);
    const { refetch } = useGetData();
    const { mutateAsync: putData } = usePutData();

    const handleAddDependent = () => {
        setDependents([...dependents, { id: Date.now(), name: '' }]);
    };

    const handleSave = async () => {
        await putData({ id: employee.id, data: { ...employee, dependents } })
        await refetch();
        setIsEditing(false);
    };

    return (
        <div className="p-4 border rounded-md mb-4">
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border border-blue-500 mr-2"
                    />
                    {dependents.map((dep, index) => (
                        <input
                            key={dep.id}
                            type="text"
                            value={dep.name}
                            onChange={(e) => {
                                const newDependents = [...dependents];
                                newDependents[index].name = e.target.value;
                                setDependents(newDependents);
                            }}
                            className="border border-blue-500 mr-2"
                        />
                    ))}
                    <button onClick={handleAddDependent} className="mr-2 bg-green-500 text-white py-2 px-4 rounded">
                        Add Dependent
                    </button>
                    <button onClick={handleSave} className="bg-blue-500 text-white py-2 px-4 rounded">Save</button>
                </>
            ) : (
                <>
                    <p className="font-bold text-black">{employee.name}</p>
                    {employee.dependents.map((dep) => (
                        <p key={dep.id}>{dep.name}</p>
                    ))}
                    <button onClick={() => setIsEditing(true)} className="mr-2 bg-blue-500 text-white py-2 px-4 rounded">
                        Edit
                    </button>
                    <button onClick={() => onDelete(employee.id)} className="mr-2 bg-red-500 text-white py-2 px-4 rounded">Delete</button>
                </>
            )}
        </div>
    );
};
