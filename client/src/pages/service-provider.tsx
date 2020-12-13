import React, { useEffect, useState } from "react";
import ServiceRequests from "../components/serviceRequests/service-requests";
import UserComponent from "../components/user/user";
import UserForm from "../components/user/user-form";
import { ServiceRequest } from "../interfaces/serviceRequest";
import { UserInterface } from "../interfaces/user";
import request from "../utils/request";
import './service-provider.scss';

export default function ServiceProvider() {
    const [user, setUser] = useState<UserInterface | null>(null);
    const [serviceRequests, setServiceRequests] = useState<ServiceRequest[] | null>(null);
    const [acceptedServiceRequests, setAcceptedServiceRequests] = useState<ServiceRequest[] | null>(null);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const handleOnSubmit = (data: UserInterface) => setUser(data);

    useEffect(() => {
        if (user) {
            setLoading(true);
            const services = user.services.map((service) => service.value)
            request.post('/sample-requests', { services })
                .then((res) => setServiceRequests(res.data.sampleServiceRequests))
                .catch((err: Error) => setError(err))
                .finally(() => setLoading(false));
        }

    }, [user]);

    function handleAcceptRequest(serviceRequest: ServiceRequest) {
        if (acceptedServiceRequests && acceptedServiceRequests.length) {
            setAcceptedServiceRequests([...acceptedServiceRequests, serviceRequest]);
        } else {
            setAcceptedServiceRequests([serviceRequest])
        }
    }

    return (
        <div className="service-provider">
            {!user && <UserForm onSubmit={handleOnSubmit} />}
            {user && (
                <>
                    <UserComponent user={user} />
                    {isLoading && (
                        <p>Loading...</p>
                    )}
                    {error && (
                        <p className="error">Failed to load the service requests!</p>
                    )}
                    {!error && serviceRequests && (
                        <ServiceRequests acceptedServiceRequests={acceptedServiceRequests} handleAcceptRequest={handleAcceptRequest} serviceRequests={serviceRequests} />
                    )}
                </>
            )}
        </div>
    );
}
