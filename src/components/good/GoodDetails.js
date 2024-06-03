import React, { useState, useEffect } from 'react';
import { request } from '../../helpers/axios_helper';
import {useParams} from "react-router-dom";
import {useAuth} from "../auth/AuthProvider";

const GoodDetail = () => {
    const { id } = useParams();
    const [good, setGood] = useState(null);
    const { isAuthenticated  } = useAuth();

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

    return (
        <div className="container">
            {good ? (
                <div>
                    <h2>Good Details</h2>
                    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                        <ol className="carousel-indicators">
                            {good.goodPhoto.map((photo, index) => (
                                <li
                                    key={index}
                                    data-target="#carouselExampleIndicators"
                                    data-slide-to={index}
                                    className={index === 0 ? 'active' : ''}
                                ></li>
                            ))}
                        </ol>
                        <div className="carousel-inner">
                            {good.goodPhoto.map((photo, index) => (
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
                    <div className="card mt-3">
                        <div className="card-body">
                            <h5 className="card-title">{good.goodName}</h5>
                            <p className="card-text">{good.goodDescription}</p>
                            <p className="card-text"><strong>Brand:</strong> {good.goodBrand}</p>
                            <p className="card-text"><strong>Price:</strong> ${good.clientPrice}</p>

                            {isAuthenticated ? (
                                <form action={`/good/${id}`} method="post">
                                    <button type="submit" className="btn btn-primary">Add</button>
                                </form>
                            ) : (
                                <div>
                                    <h5 className="card-title">Buy good</h5>
                                    <form action="/log-in">
                                        <button type="submit" className="btn btn-primary">Log in</button>
                                    </form>
                                </div>
                            )}
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
