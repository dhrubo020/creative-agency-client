import React from 'react';
import { useState } from 'react';
import Axios from 'axios';
import AvailableServices from './AvailableServices';


const AddService = () => {
    const [serviceInfo, setServiceInfo] = useState({
        title: '',
        description: '',
        imageUrl: ''
    })

    const handleOnBlur = (e) => { //----------------------- handleOnBlur
        const eName = e.target.name;
        const eValue = e.target.value;
        const newObject = { ...serviceInfo }

        if (eName === 'title') {
            newObject.title = eValue;
        } else if (eName === 'description') {
            newObject.description = eValue;
        }
        setServiceInfo(newObject);
    }

    const handleFormSubmit = (e) => { //-------------------------- handleFormSubmit
        console.log(serviceInfo)
        fetch('http://localhost:3001/addNewService', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(serviceInfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    window.alert("Item added successfully!")
                } else {
                    window.alert("This item already added!")
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
                const newObject = { ...serviceInfo }
                newObject.imageUrl = resp.data.data.thumb.url;
                setServiceInfo(newObject);
            })
        e.preventDefault();
    }


    return (
        <div className="p-4 my-3" style={{backgroundColor: '#f4f7fc'}}>
            <p className="h4  mt-4">Add New service</p>
            <div className="">
                <form onSubmit={handleFormSubmit}>
                    <div className="container fluid">
                        <div className="row">
                            <div className="col-md-6 col-lg-6 col-sm-12">
                                <label>Service Title</label>
                                <input onBlur={handleOnBlur} name="title" type="text" className="form-control" required />
                                <br />

                                <label >Description</label>
                                <textarea onBlur={handleOnBlur} name="description" type="text" className="form-control" rows="3" required />
                            </div>
                            <div className="col-md-6 col-lg-6 col-sm-12">
                                <br/><br/>
                                <div className="ml-md-5 mt-1" >
                                    <label >Upload Service Image : </label>
                                    <br />
                                    {
                                        serviceInfo.imageUrl ? <img src={serviceInfo.imageUrl} height="60" alt="" /> : <small className="text-mute">Image will be appeared here</small>
                                    }
                                    <br />
                                    <input onChange={upload} type="file" name="myFile" />
                                </div>
                                <br />
                                <div className="ml-5">
                                    <button type="submit" className="brand-green-btn">Submit</button>
                                </div>
                                <br /><br />
                            </div>
                        </div>
                    </div>
                </form>
            </div>


            {/* available service list */}
                                 
            <AvailableServices/>                            

        </div>
    );
};

export default AddService;