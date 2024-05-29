import React, { useState } from 'react';
import type { EmployeeProps } from "./types";

interface Props {
    employee: EmployeeProps;
    dependents?: EmployeeProps['dependents']
    handleAddDependent: () => void;
    handleSave: (value?: number) => Promise<void>;
    handleSetValueDependent: (value: EmployeeProps['dependents']) => void;
    isEditing: number | null;
    onEdit: (value: number | null) => void;
    onDelete: (id: number) => void;
    onSave?: ({ id, data }: { id: EmployeeProps['id'], data: EmployeeProps }) => Promise<Array<EmployeeProps>>;
}

export const Employee: React.FC<Props> = ({ employee, onDelete, onSave, isEditing, onEdit, dependents, handleAddDependent, handleSetValueDependent, handleSave }) => {
    const [name, setName] = useState(employee.name);
    
    return (
        <div className="p-4 border rounded-md mb-4">
            {isEditing === employee.id ? (
                <>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border border-blue-500 mr-2"
                    />
                    {dependents?.map((dep, index) => (
                        <input
                            key={dep.id}
                            type="text"
                            value={dep.name}
                            onChange={(e) => {
                                const newDependents = [...dependents];
                                newDependents[index].name = e.target.value;
                                handleSetValueDependent(newDependents)
                            }}
                            className="border border-blue-500 mr-2"
                        />
                    ))}
                    <button onClick={handleAddDependent} className="mr-2 bg-green-500 text-white py-2 px-4 rounded">
                        Add Dependent
                    </button>
                    <button onClick={() => handleSave()} className="bg-blue-500 text-white py-2 px-4 rounded">Save</button>
                </>
            ) : (
                <>
                    <p className="font-bold text-black">{employee.name}</p>
                    {employee.dependents.map((dep) => (
                        <p key={dep.id}>{dep.name}</p>
                    ))}
                    <button onClick={() => {
                        if(!!isEditing && isEditing !== employee.id) {
                            if(window.confirm('Please save your changes before starting editing another user')) {
                                void handleSave(employee.id);
                            }
                        } else {
                            onEdit(employee.id);
                        }
                    }} className="mr-2 bg-blue-500 text-white py-2 px-4 rounded">
                        Edit
                    </button>
                    <button onClick={() => onDelete(employee.id)} className="mr-2 bg-red-500 text-white py-2 px-4 rounded">Delete</button>
                </>
            )}
        </div>
    );
};
