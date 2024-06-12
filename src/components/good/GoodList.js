import React, { useState, useEffect } from 'react';
import { request } from '../../helpers/axios_helper';
import {Link} from "react-router-dom";
import {useGoods} from "./GoodContext";

const GoodList = () => {
    const {goods} = useGoods();

    return (
        <div>
            <h2>Goods List</h2>
            {goods ? (
                <div className="row">
                    {goods.map(good => (
                        <div className="col-md-4" key={good.id}>
                            <div className="card tour-card">
                                <img
                                    src={good.goodPhoto[0]}
                                    className="card-img-top tour-image"
                                    alt="Good Image"
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{good.goodName}</h5>
                                    <p className="card-text">Description: {good.goodDescription}</p>
                                    <p className="card-text">Brand: {good.goodBrand}</p>
                                    <p className="card-text">Price: {good.clientPrice}</p>
                                    <Link to={`/good/${good.id}`} className="btn btn-primary">View Details</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default GoodList;
