import React from 'react';
import { Link } from 'react-router-dom';

const ProvidedServicesList = (props) => {
    const { description, title, imageUrl, _id } = props.data;
    console.log(description, title, imageUrl, _id)
    return (
        <Link to={`/user/${title}`}  style={{textDecoration:'none', color: 'inherit'}}>
            <div className="card m-3 px-3">
                <div className="text-center p-4">
                    <img src={imageUrl} height="70" alt="" /> <br /> <br />
                    <h5 className="font-weight-bold">{title}</h5>
                    <p>{description}</p>
                </div>
            </div>
        </Link>

    );
};

export default ProvidedServicesList;