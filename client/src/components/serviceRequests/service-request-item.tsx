import React, { useState } from 'react';
import { ServiceRequest } from '../../interfaces/serviceRequest';
import './service-requests.scss';

interface ServiceRequestProps {
    serviceRequest: ServiceRequest,
    handleAcceptRequest: (serviceRequest: ServiceRequest) => void,
    index: number,
    acceptedServiceRequests: ServiceRequest[] | null,
}

export default function ServiceRequestItem({ serviceRequest, handleAcceptRequest, index, acceptedServiceRequests }: ServiceRequestProps) {
    const [accepted, setAccepted] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    // check if there is a conflict on on of the accepted service
    function isConflict(serviceRequest: ServiceRequest) {
        if (!acceptedServiceRequests) {
            return false;
        }

        // filter the conflicted dates
        const conflictedDates = acceptedServiceRequests.filter(acceptedRequest => new Date(acceptedRequest.startDate).getTime() === new Date(serviceRequest.startDate).getTime());
        return !!conflictedDates.length;
    }

    function handleAcceptRequestClick(index: number, serviceRequest: ServiceRequest) {
        setError(false);

        if (isConflict(serviceRequest)) {
            return setError(true);
        }

        setAccepted(true);
        handleAcceptRequest(serviceRequest);
    }

    return (
        <div className="service-requests-content">
            <h3>Company: {serviceRequest.company}</h3>
            <p>Service: {serviceRequest.requestedService}</p>
            <p>Description: {serviceRequest.description}</p>
            <p>Start: {serviceRequest.startDate}</p>
            <p>End: {serviceRequest.endDate}</p>
            <p>Rate(hourly): {serviceRequest.hourlyRate}</p>
            <button disabled={accepted} onClick={() => handleAcceptRequestClick(index, serviceRequest)}>{accepted ? "Accepted" : "Accept"}</button>
            {error && (
                <p className="error">There is another event on {serviceRequest.startDate}</p>
            )}
        </div>
    )
}