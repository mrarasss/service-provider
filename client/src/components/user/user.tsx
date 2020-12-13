import React from 'react';
import { UserInterface } from '../../interfaces/user';
import './user.scss';

interface UserProps {
    user: UserInterface
}

export default function User({ user }: UserProps) {
    const { name, age, picture, services } = user;

    return (
        <div className="user">
            <div className="user-content">
                <h2 className="user-title">{name} / {age}</h2>
                <div className="user-services">
                    {services.map((service, index) => (
                        <div className="user-services-content" key={index}>
                            <label>{service.label}</label>
                            <progress value={service.ability} max="10" />
                        </div>
                    ))}
                </div>
            </div>
            <div className="user-image" style={{ backgroundImage: `url(${picture})` }}>
            </div>
        </div>
    )
}