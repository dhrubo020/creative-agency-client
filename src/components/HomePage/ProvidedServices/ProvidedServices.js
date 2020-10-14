import React, { useEffect, useState } from 'react';
import ProvidedServicesList from './ProvidedServicesList';
import './ProvidedServices.css';
const ProvidedServices = () => {

    const [services, setServices] = useState([])
    useEffect(() => {
        fetch(`http://localhost:3001/getService`)
            .then(res => res.json())
            .then(data => {
                setServices(data)
            })
    }, [])

    return (

        <div className="gap">
            <div className="my-5">
                <h3 className="text-center"><strong>Provide Awesome <span style={{ color: '#7AB259' }}>Services</span></strong></h3>
            </div>
            <div className="provided-service-scroll-area pr-4">
                <div className="card-columns">
                    {
                        services.length > 0
                            ?
                            services.map((each, index) => <ProvidedServicesList key={index} data={each} />)
                            :
                            <h4 className="text-center"> Loading... </h4>
                    }
                </div>
            </div>

        </div>


    );
};

export default ProvidedServices;