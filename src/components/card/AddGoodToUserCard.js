import React, { useState } from 'react';
import { useParams,  } from 'react-router-dom';
import { request } from '../../helpers/axios_helper';

const AddGoodToUserCard = () => {
    const { id } = useParams();
    const [status, setStatus] = useState(null);


    const handleAddToCard = async (e) => {
        e.preventDefault();
        try {
            const response = await request('POST', `/good/${id}`);
            if (response.data === true) {
                setStatus('Good has been successfully added to your card.');
            } else {
                setStatus('Failed to add good to your card.');
            }
        } catch (error) {
            setStatus('An error occurred while adding the good to your card.');
            console.error('Error adding good to card:', error);
        }
    };

    return (
        <div className="container">
            <h2>Add Good to Card</h2>
            {status ? (
                <p>{status}</p>
            ) : (
                <div>
                    <p>Do you want to add this good to your card?</p>
                    <button onClick={handleAddToCard} className="btn btn-primary">Add to Card</button>
                </div>
            )}
        </div>
    );
};

export default AddGoodToUserCard;
