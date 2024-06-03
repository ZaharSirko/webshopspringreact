
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewCard = () => {
    const [card, setCard] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8080/card/user@example.com')
            .then(response => {
                setCard(response.data);
            })
            .catch(error => {
                console.error('Error fetching card:', error);
            });
    }, []);

    return (
        <div>
            <h2>Your Shopping Cart</h2>
            {card ? (
                <div>
                    {/* Display card details */}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ViewCard;
