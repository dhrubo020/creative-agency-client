import React, { useState } from 'react';



const AddAdmin = () => {
    const [email, setEmail] = useState({email: ''})

    const handleOnBlur = (e) => { //----------------------- handleOnBlur
        setEmail({email: e.target.value});
    }

    const handleFormSubmit = (e) => { //-------------------------- handleFormSubmit
        console.log(email)
        fetch('http://localhost:3001/addNewAdmin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(email)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    window.alert("Admin added successfully!")
                } else {
                    window.alert("This Admin already added!")
                }
    
            })
        e.preventDefault();
    }

    return (
        <div className="bg-light p-4 my-3">
            <p className="h4  mt-4">Make a New Admin</p>
            <br/> <br/>
            <div className="w-50">
                <form onSubmit={handleFormSubmit}>
                    <label>Email of New Admin</label>
                    <input onChange={handleOnBlur} name="title" type="text" className="form-control" required />
                    <br/>
                    <button type="submit" className="brand-green-btn">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AddAdmin;