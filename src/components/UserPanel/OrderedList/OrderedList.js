import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import OrderCards from './OrderCards';

const OrderedList = ({ email }) => {

    const [orderedItems, setOrderedItems] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3001/getOrderedItems` , {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email: email})
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setOrderedItems(data)
                }else{
                    console.log('no data found')
                } 
            })
            .catch(err => console.log(err))
    }, [email])

    return (
        <div>
            <div className="card-columns">
                {
                    orderedItems.length > 0
                        ?
                        orderedItems.map((each, index) => <OrderCards key={index} data={each} />)
                        :
                        <h4 className="text-center">
                             Loading...
                         </h4>
                }
                
            </div>
        </div>
    );
};

export default OrderedList;