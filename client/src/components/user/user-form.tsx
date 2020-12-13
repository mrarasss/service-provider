import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { generateServiceOptions, Service } from "../../interfaces/service";
import { UserInterface } from "../../interfaces/user";
import Input from "../input/input";
import Services from "../services/services";
import UploadPicture from "../uploadImage/upload-picture";
import "./user.scss";

interface UserFormProps {
    onSubmit: (data: UserInterface) => void;
}

export default function UserForm({ onSubmit }: UserFormProps) {
    const [services, setServices] = useState<Service[] | null>(null);
    const [pictureUrl, setPictureUrl] = useState<string>("");
    const [servicesError, setServicesError] = useState<boolean>(false);

    // react-hook-form
    const { register, handleSubmit, errors } = useForm();

    const handleOnSubmit = (data: UserInterface) => {
        setServicesError(false);

        if (!services || services.length < 3) return setServicesError(true);

        onSubmit({ ...data, services, picture: pictureUrl });
    };

    function handleSelectChange(value: Service[]) {
        setServices(value);
    }

    // set error false if at least 3 items selected
    useEffect(() => {
        if (services && services.length > 2) setServicesError(false);
    }, [services]);

    function handleAbilityChange(index: number, value: number) {
        if(services){
            const selectedServices  = services;
            selectedServices[index].ability = value;
            setServices(selectedServices);
        }
    }

    return (
        <>
            <h2>Create User</h2>
            <form className="user-form" onSubmit={handleSubmit(handleOnSubmit)}>
                <Input
                    reference={register({ required: true })}
                    type="text"
                    name="name"
                    placeholder="Name"
                    error={errors.name}
                    label="Name"
                />
                <Input
                    reference={register({ required: true })}
                    type="number"
                    name="age"
                    placeholder="Age"
                    error={errors.name}
                    label="Age"
                />
                <UploadPicture
                    onChange={(value) => setPictureUrl(value)}
                    reference={register({ required: true })}
                />
                {services && (
                    <div className="services">
                        <strong>Scale your skills between 1 and 10</strong>
                        {services.map((service, index) => (
                            <Services
                                key={index}
                                label={service.label}
                                type="text"
                                value={service.ability}
                                name={service.label}
                                index={index}
                                onChange={handleAbilityChange}
                            />
                        ))}
                    </div>
                )}
                <div className="service-select">
                    <label>Services</label>
                    <Select
                        placeholder="Select at least 3 skills.."
                        options={generateServiceOptions()}
                        isMulti
                        onChange={(e: any) => handleSelectChange(e)}
                    />
                    {servicesError && (<p>Select at least 3 services</p>)}
                </div>
                <button>Submit</button>
            </form>
        </>
    );
}
