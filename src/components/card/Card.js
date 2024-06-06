import React, { useState, useEffect } from 'react';
import { request } from '../../helpers/axios_helper';

const Card = () => {
    const [cards, setCards] = useState([]);
    const [error, setError] = useState(null);
    const [notification, setNotification] = useState('');

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await request('GET', '/profile/card');
                setCards(response.data);
            } catch (error) {
                console.error('Error fetching cards:', error);
                setError('An error occurred while fetching the cards.');
            }
        };

        fetchCards();
    }, []);

    const handleCancel = async (cardId) => {
        try {
            await request('POST', `profile/card/cancel/${cardId}`);
            setNotification('Good has been successfully removed from your card.');
            setTimeout(() => setNotification(''), 3000);
            setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
        } catch (error) {
            console.error('Error canceling card:', error);
            setError('An error occurred while canceling the card.');
        }
    };

    if (error) {
        return <div className="container"><p>{error}</p></div>;
    }

    if (!cards.length) {
        return <div className="container"><p>No goods in the card.</p></div>;
    }

    return (
        <div className="container">
            {notification && (
                <div className="notification-box">
                    {notification}
                </div>
            )}
            <h1>Cart</h1>
            {cards.map((card) => (
                <div key={card.id} className="row">
                    <div className="col-lg-8">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Cancel</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr key={card.good.id}>
                                    <td>
                                        <img src={card.good.goodPhoto[0]} alt="Good Image" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                                    </td>
                                    <td style={{ verticalAlign: 'middle' }}>{card.good.goodName}</td>
                                    <td style={{ verticalAlign: 'middle' }}>{card.good.goodDescription}</td>
                                    <td style={{ verticalAlign: 'middle' }}>${card.good.clientPrice}</td>
                                    <td style={{ verticalAlign: 'middle' }}>
                                        <button onClick={() => handleCancel(card.id)} className="btn btn-danger">Cancel</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Card;
