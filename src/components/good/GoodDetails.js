import React, { useState, useEffect } from 'react';
import { request } from '../../helpers/axios_helper';
import { useParams } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

const GoodDetail = () => {
    const { id } = useParams();
    const [good, setGood] = useState(null);
    const { isAuthenticated } = useAuth();
    const [notification, setNotification] = useState('');

    useEffect(() => {
        const fetchGood = async () => {
            try {
                const response = await request('GET', `/good/${id}`);
                setGood(response.data);
            } catch (error) {
                console.error('Error fetching good:', error);
            }
        };

        fetchGood();
    }, [id]);

    const handleAddToCard = async (e) => {
        e.preventDefault();
        try {
            const response = await request('POST', `/good/${id}`);
            if (response.data === true) {
                setNotification('Good has been successfully added to your card.');
                setTimeout(() => setNotification(''), 3000);
            }
        } catch (error) {
            console.error('Error adding good to card:', error);
        }
    };

    return (
        <div className="container">
            {notification && (
                <div className="notification-box">
                    {notification}
                </div>
            )}
            {good ? (
                <div className="container px-4 px-lg-5 my-5">
                    <div className="row gx-4 gx-lg-5 align-items-center">
                        <div className="col-md-6">
                            <div id="carouselExampleIndicators" className="carousel slide mb-5 mb-md-0" data-ride="carousel">
                                <ol className="carousel-indicators">
                                    {good && good.goodPhoto.map((photo, index) => (
                                        <li
                                            key={index}
                                            data-target="#carouselExampleIndicators"
                                            data-slide-to={index}
                                            className={index === 0 ? 'active' : ''}
                                        ></li>
                                    ))}
                                </ol>
                                <div className="carousel-inner">
                                    {good && good.goodPhoto.map((photo, index) => (
                                        <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                            <img className="d-block w-100" src={photo} alt={`Slide ${index + 1}`} />
                                        </div>
                                    ))}
                                </div>
                                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="sr-only">Previous</span>
                                </a>
                                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="sr-only">Next</span>
                                </a>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <h1 className="display-5 fw-bolder lead text-start">{good ? good.goodName : 'Loading...'}</h1>
                            <div className="fs-5 mb-5 lead text-start">
                                <span>{good && `Price: $${good.clientPrice}`}</span>
                            </div>
                            <p className="lead text-start">{good && `Description: ${good.goodDescription}`}</p>
                            <div className="d-flex">
                                {isAuthenticated ? (
                                    <button className="btn btn-outline-dark flex-shrink-0" type="button" onClick={handleAddToCard}>
                                        <i className="bi-cart-fill me-1"></i>
                                        Add to cart
                                    </button>
                                ) : (
                                    <div className="text-start">
                                        <h5 className="card-title">Buy good</h5>
                                        <form action="/log-in">
                                            <button type="submit" className="btn btn-outline-dark flex-shrink-0">Log in</button>
                                        </form>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default GoodDetail;
