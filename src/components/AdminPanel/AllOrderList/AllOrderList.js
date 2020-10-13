import React, { useEffect, useState } from 'react';

const AllOrderList = () => {

    const [data, setData] = useState([])
    const [status, setStatus] = useState('')

    useEffect(() => {
        fetch(`http://localhost:3001/getAllOrder`)
            .then(res => res.json())
            .then(data => {
                setData(data)
                console.log(data)
            })
    }, [])

    const handleStatus = (e, id) => {
        const newStatus = e.target.value
        console.log(newStatus, id)
        const sendData = {id, newStatus}

        fetch(`http://localhost:3001/updateStatus` ,{
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(sendData)
            })
            .then(res => res.json())
            .then(result=>{
                if(result){
                    window.alert("Status update successfully")
                }else{
                    window.alert("Error in update")
                }
            })
    }
    return (
        <div>
            <div className="">
                <h4>List of Orders - Total {data.length}</h4>
            </div>
            <div className="d-flex flex-wrap" style={{ height: '400px', overflow: 'auto' }}>

                <table class="table table-hover">
                    <thead>
                        <tr className="table-primary">
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email ID</th>
                            <th scope="col">Service</th>
                            <th scope="col">Project Details</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody style={{ height: "600px", overflow: 'auto' }}>

                        {
                            data.map((each, index) =>
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{each.name}</td>
                                    <td>{each.email}</td>
                                    <td>{each.serviceTitle}</td>
                                    <td style={{maxWidth:'150px'}}>{each.details}</td>
                                    <td>
                                        <select onChange={(e) => handleStatus(e, each._id)} class="custom-select" id="inputGroupSelect01">
                                            <option value={each.status} defaultValue>{each.status}</option>
                                            <option value="Ongoing">Ongoing</option>
                                            <option value="Done">Done</option>
                                            <option value="Pending">Pending</option>
                                        </select>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default AllOrderList;