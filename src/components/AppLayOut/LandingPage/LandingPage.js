import React from 'react';
import Banner from '../../HomePage/Banner/Banner';
import CompanyLogos from '../../HomePage/CompanyLogos/CompanyLogos';
import Footer from '../../HomePage/Footer/Footer';
import Navbar from '../../HomePage/Navbar/Navbar';
import ProvidedServices from '../../HomePage/ProvidedServices/ProvidedServices';
import UserReview from '../../HomePage/UserReview/UserReview';
import Works from '../../HomePage/Works/Works';
import './LandingPage.css'

const LandingPage = () => {
    return (
        <div className="font-weight-normal">
            <div className="banner-bg">
                <div className="container">
                    <Navbar />
                    <Banner/>
                </div>
            </div>
            <div className="container">
                <CompanyLogos/>
                <ProvidedServices/>
            </div>
            <div className="work-bg">
                <div className="container">
                    <Works/>
                </div>
            </div>
            <div className="container my-5">
                    <UserReview/>
                </div>
            <div className="footer-bg">
                <div className="container">
                    <Footer/>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;