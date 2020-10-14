import React, { useEffect, useState } from 'react';

const AllOrderList = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3001/getAllOrder`)
            .then(res => res.json())
            .then(data => {
                setData(data)
            })
    }, [])

    const handleStatus = (e, id) => {
        const newStatus = e.target.value
        const sendData = { id, newStatus }

        fetch(`http://localhost:3001/updateStatus`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(sendData)
        })
            .then(res => res.json())
            .then(result => {
                if (result) {
                    window.alert("Status update successfully")
                } else {
                    window.alert("Error in update")
                }
            })
    }
    return (
        <div >
            <div className="py-2">
                <h4>List of Orders - Total {data.length}</h4>
            </div>
            <div className="d-flex flex-wrap p-5" style={{ height: '450px', overflow: 'auto', backgroundColor: '#f4f7fc' }}>

                <table className="table table-hover p-3 bg-white " >
                    <thead style={{fontWeight:'500'}}>
                        <tr className="table-primary" style={{fontWeight:'500'}}>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email ID</th>
                            <th scope="col">Service</th>
                            <th scope="col">Project Details</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody style={{ height: "600px", overflow: 'auto'}}>

                        {
                            data.map((each, index) =>
                                <tr style={{fontWeight:'500'}}>
                                    <td>{index + 1}</td>
                                    <td>{each.name}</td>
                                    <td>{each.email}</td>
                                    <td>{each.serviceTitle}</td>
                                    <td style={{ maxWidth: '150px' }}>{each.details}</td>
                                    <td>
                                        <select onChange={(e) => handleStatus(e, each._id)} className="custom-select mr-5" id="inputGroupSelect01">
                                            {
                                                each.status === 'Pending'
                                                &&
                                                <>
                                                    <option value="Pending" defaultValue style={{ color: '#FF4545' }}>
                                                        Pending
                                                    </option>
                                                    <option value="Ongoing">Ongoing</option>
                                                    <option value="Done">Done</option>
                                                </>
                                            }
                                            {
                                                each.status === 'Ongoing'
                                                &&
                                                <>
                                                    <option value="Ongoing" defaultValue style={{ color:'#FFBD3E'}}>
                                                        Ongoing
                                                    </option>
                                                    <option value="Ongoing">Done</option>
                                                    <option value="Done">Pending</option>
                                                </>
                                            }
                                            {
                                                each.status === 'Done'
                                                &&
                                                <>
                                                    <option value="Done" defaultValue style={{ color: '#009444' }}>
                                                        Done
                                                    </option>
                                                    <option value="Ongoing">Ongoing</option>
                                                    <option value="Done">Pending</option>
                                                </>
                                            }


                                            {/* <option value={each.status} defaultValue>
                                                {
                                                    each.status === 'Pending'
                                                    &&
                                                    <span style={{color:'#FF4545'}}> {each.status} </span>

                                                }
                                            </option>
                                            <option value="Ongoing">Ongoing</option>
                                            <option value="Done">Done</option>
                                            <option value="Pending">Pending</option> */}
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