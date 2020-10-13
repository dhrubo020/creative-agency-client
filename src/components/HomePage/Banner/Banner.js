import React from 'react';
import bannerImage from '../../../images/logos/Frame.png';


const Banner = () => {
    return (
        <div className="">
            <div className="row my-5">
                <div className="col-md-6 ">
                    <div className="p-2">
                        <h2 className="font-weight-bold">Let’s Grow Your Brand To The Next Level</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus commodo ipsum duis laoreet maecenas. Feugiat </p>
                        <button className="brand-dark-btn">Hire Us</button>
                    </div>
                </div>
                <div className="col-md-6 ">
                    <img src={bannerImage} height="100" className="img-fluid p-2" alt="" />
                </div>
            </div>
        </div>
    );
};

export default Banner;