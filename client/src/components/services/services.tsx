import React, { useState } from 'react';

interface ServicesProps {
    name: string,
    type: string,
    index: number,
    value: number,
    label: string,
    onChange: (index: number, value: number) => void
}

export default function Services({ name, type, label, index, value, onChange }: ServicesProps) {
    const [ability, setAbility] = useState<number>(value);
    const [error, setError] = useState(false);

    function handleChange(newValue: number) {
        setError(false);

        // check if the number is in given range otherwise notify user
        if(newValue > 10 || newValue < 0) {
            return setError(true);
        }

        setAbility(newValue)
        onChange(index, newValue);
    }
    
    return (
        <div>
            <label>{label}</label>
            <input
                name={label}
                type={type}
                value={ability}
                onChange={(e) => handleChange(Number(e.target.value))}
            />
            {error && (
                <p>Number should be between 1 and 10</p>
            )}
        </div>
    )
}