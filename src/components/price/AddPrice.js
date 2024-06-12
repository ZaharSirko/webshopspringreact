import React, { useState, useEffect } from 'react';
import {hasRoleAdmin, request} from '../../helpers/axios_helper';
import {useNavigate} from "react-router-dom";
import NoRoleAdminButton from "../block/NoRoleAdminButton";

const AddPrice = () => {
    const isAdmin = hasRoleAdmin();
    const navigate = useNavigate();
    const [goods, setGoods] = useState([]);
    const [price, setPrice] = useState({
        good_id: null,
        supplier_price: '',
        client_price: '',
        bought_amount: '',
        created_at: ''
    });

    useEffect(() => {
        if (isAdmin) { fetchGoods();}
    }, []);

    const fetchGoods = async () => {
        try {
            const response = await request('GET', '/price/add');
            setGoods(response.data);
        } catch (error) {
            console.error('Error fetching goods:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPrice({
            ...price,
            [name]: value
        });
    };

    const handleGoodChange = (e) => {
        const selectedGood = goods.find(good => good.id === parseInt(e.target.value));
        setPrice({
            ...price,
            good_id: selectedGood
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await request('POST', '/price/add', price);
            console.log('Price added successfully:', response.data);
            navigate("/")
        } catch (error) {
            console.error('Error adding price:', error);
        }
    };

    return (
        <div>
            {isAdmin ? (
                <div className="container">
                    <h2>Add New Price</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Good:</label>
                            <select
                                className="form-control"
                                name="good_id"
                                onChange={handleGoodChange}
                                required
                            >
                                <option value="">Select a Good</option>
                                {goods.map((good) => (
                                    <option key={good.id} value={good.id}>
                                        {`${good.goodName} (Good Name), ${good.goodBrand} (Good Brand)`}
                                    </option>
                                ))}
                            </select>
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
                <NoRoleAdminButton/>
            )
            }
        </div>
    )
        ;
};

export default AddPrice;
