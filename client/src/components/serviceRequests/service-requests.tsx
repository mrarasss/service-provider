import React from 'react';
import { ServiceRequest } from '../../interfaces/serviceRequest';
import ServiceRequestItem from './service-request-item';
import './service-requests.scss';

interface ServiceRequestProps {
    serviceRequests: ServiceRequest[],
    handleAcceptRequest: (serviceRequest: ServiceRequest) => void,
    acceptedServiceRequests: ServiceRequest[] | null,
}

export default function ServiceRequests({ serviceRequests, handleAcceptRequest, acceptedServiceRequests }: ServiceRequestProps) {
    return (
        <div className="service-requests">
            <h2>Service Requests From Clients</h2>
            {serviceRequests.map((serviceRequest, index) => (
                <ServiceRequestItem key={index} acceptedServiceRequests={acceptedServiceRequests} handleAcceptRequest={handleAcceptRequest} serviceRequest={serviceRequest} index={index} />
            ))}
        </div>
    )
}