import React, { useState } from 'react';
import Axios from 'axios';

const Order = (props) => {
    const service_name = props.service_name;
    const {displayName, email} = props.user;
    
    const [orderInfo, setOrderInfo] = useState({
        name: displayName,
        email: email,
        serviceTitle: '',
        details: '',
        price: '',
        imageUrl: '',
        status: 'Pending'
    })

    const handleOnBlur = (e) => {
        const eName = e.target.name;
        const eValue = e.target.value;
        const newObject = { ...orderInfo }

        if (eName === 'name') {
            newObject.name = eValue;
        } else if (eName === 'email') {
            newObject.email = eValue;
        } else if (eName === 'serviceTitle') {
            newObject.serviceTitle = eValue;
        } else if (eName === 'details') {
            newObject.details = eValue;
        } else if (eName === 'price') {
            newObject.price = eValue;
        }

        setOrderInfo(newObject);
    }


    const handleFormSubmit = (e) => {
        console.log(orderInfo)
        fetch('http://localhost:3001/placeOrder', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderInfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    window.alert("Your Order is Placed successfully!")
                } else {
                    window.alert("Something went wrong. Please try again!")
                }

            })
        e.preventDefault();
    }

    const uploadImage = (img) => {
        let body = new FormData()
        body.set('key', '487bbc78512fb205a6c29d2bb714749b')
        body.append('image', img)

        return Axios({
            method: 'post',
            url: 'https://api.imgbb.com/1/upload',
            data: body
        })
    }
    const upload = (e) => {
        uploadImage(e.target.files[0])
            .then(resp => {
                // console.log(resp.data.data.thumb.url) // I'm aware it's data.data, that is how it returns stuff
                const newObject = { ...orderInfo }
                newObject.imageUrl = resp.data.data.thumb.url;
                setOrderInfo(newObject);
            })
        e.preventDefault();
    }
    return (
        <div className="my-3" style={{ backgroundColor: '#f4f7fc' }}>
            <p className="h4  p-3">Order Now</p>
            <div className="">
                <form onSubmit={handleFormSubmit}>
                    <div className="container fluid">
                        <div className="row">
                            <div className="col-md-6 col-sm-6 col-lg-6" >
                                {/* <label>Your Name / Company's name</label> */}
                                <input onBlur={handleOnBlur} name="name" type="text" defaultValue={displayName} placeholder="Your Name / Company's name" className="form-control" required />
                                <br />

                                {/* <label>Email</label> */}
                                <input onBlur={handleOnBlur} name="email" type="text" defaultValue={email} placeholder="Your Email" className="form-control" required />
                                <br />

                                {/* <label>Service</label> */}
                                <input onBlur={handleOnBlur} name="serviceTitle" type="text" defaultValue={service_name} placeholder="Service" className="form-control" required />
                                <br />


                                {/* <label>Price</label> */}
                                <input onBlur={handleOnBlur} name="price" type="text" placeholder="Price" className="form-control" required />
                                <br />
                            </div>

                            <div className="col-md-6 col-sm-6 col-lg-6 ">
                                <div className="ml-md-5" >
                                    {/* <label >Project Details</label> */}
                                    <textarea onBlur={handleOnBlur} name="details" type="text" placeholder="Project Details" className="form-control" rows="3" required />
                                    <br /> <br />

                                    <label >Upload Demo : </label>
                                    <br />
                                    {
                                        orderInfo.imageUrl ? <img src={orderInfo.imageUrl} height="60" alt="" /> : <small className="text-muted">Image will be appeared here</small>
                                    }
                                    <br />
                                    <input onChange={upload} id="" placeholder="Upload file" type="file" name="myFile" />
                                    {/* <div className="uploadBtn">
                                        <i className="fas fa-cloud-upload-alt" style={{ color: 'green' }} aria-hidden="true"></i>
                                        <span style={{ color: 'green' }}> Upload file </span>
                                        <div className="styleInput"><input type="file" /></div>
                                    </div> */}

                                </div>
                                <br />
                                <div className="text-center ml-0">
                                    <button type="submit" className="brand-dark-btn">Send</button>
                                </div>
                                <br /><br />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            {/* <form action='https://volunteer-server-by-dhrubo.herokuapp.com/upload' method='post' encType="multipart/form-data"> */}

        </div>
    );
};

export default Order;