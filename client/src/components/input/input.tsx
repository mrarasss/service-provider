import React from "react";
import './input.scss';

interface InputProps {
    label: string,
    name: string,
    reference: (value: HTMLInputElement) => void,
    error: string,
    type: string,
    placeholder: string,
}
export default function Input({
    label,
    name,
    reference,
    error,
    type,
    placeholder,
}: InputProps) {
    return (
        <div className="input">
            <label className="input-label">{label}</label>
            <input
                ref={reference}
                type={type}
                name={name}
                placeholder={placeholder}
            />
            {error && <p className="input-error">{label} is required!</p>}
        </div>
    );
}
