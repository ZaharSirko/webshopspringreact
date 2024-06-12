import React, { useState, useEffect } from 'react';
import {hasRoleAdmin, request} from '../../helpers/axios_helper';
import {useParams} from 'react-router-dom';
import NoRoleAdminButton from "../block/NoRoleAdminButton";
    const EditePrice = () => {
        const isAdmin = hasRoleAdmin();
        const { priceId } = useParams();
    const [price, setPrice] = useState({
        good_id: null,
        supplier_price: '',
        client_price: '',
        bought_amount: '',
        created_at: ''
    });

    useEffect(() => {
        if(isAdmin){
            fetchPrice();}
    }, [priceId]);


    const fetchPrice = async () => {
        try {
            const response = await request('get', `/price/edit/${priceId}`);
            setPrice(response.data);
        } catch (error) {
            console.error('Error fetching price:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPrice({
            ...price,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
              await request('PUT', `/price/edit/${priceId}`, price);
                console.log('Price updated successfully');
        } catch (error) {
            console.error('Error updating price:', error);
        }
    };

    return (
        <div>
            {isAdmin ? (
        <div className="container">
            <h2>Edit Price</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Good:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="good_id"
                        value={price.good_id ? price.good_id.goodName : ''}
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label>Supplier Price:</label>
                    <input
                        type="number"
                        className="form-control"
                        name="supplier_price"
                        value={price.supplier_price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Client Price:</label>
                    <input
                        type="number"
                        className="form-control"
                        name="client_price"
                        value={price.client_price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Bought Amount:</label>
                    <input
                        type="number"
                        className="form-control"
                        name="bought_amount"
                        value={price.bought_amount}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Created At:</label>
                    <input
                        type="date"
                        className="form-control"
                        name="created_at"
                        value={price.created_at}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
            ) : (
                <NoRoleAdminButton/>)
            }
        </div>
    );
    };

export default EditePrice;
