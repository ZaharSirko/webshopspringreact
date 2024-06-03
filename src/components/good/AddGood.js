import React, { useState } from 'react';
import { request } from '../../helpers/axios_helper';

const AddGood = () => {
    const [goodName, setGoodName] = useState('');
    const [goodDescription, setGoodDescription] = useState('');
    const [goodBrand, setGoodBrand] = useState('');
    const [images, setImages] = useState([]);

    const handleAddGood = async (e) => {
        e.preventDefault();
        try {
            const newGood = new FormData();
            newGood.append('goodName', goodName);
            newGood.append('goodDescription', goodDescription);
            newGood.append('goodBrand', goodBrand);
            Array.from(images).forEach(image => {
                newGood.append('imageFile', image);
            });

            const response = await request('post', '/good/add', newGood);
            console.log('Good added successfully:', response.data);
        } catch (error) {
            console.error('Error adding good:', error);
        }
    };

    return (
        <div className="container">
            <h2>Add New Good</h2>
            <form onSubmit={handleAddGood} method="post" encType="multipart/form-data">
                <div className="form-group">
                    <label>Good Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={goodName}
                        onChange={(e) => setGoodName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Good Description:</label>
                    <textarea
                        className="form-control"
                        value={goodDescription}
                        onChange={(e) => setGoodDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Good Brand:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={goodBrand}
                        onChange={(e) => setGoodBrand(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="imageFile">Select Images:</label>
                    <input
                        type="file"
                        className="form-control-file"
                        id="imageFile"
                        name="imageFile"
                        multiple
                        onChange={(e) => setImages(e.target.files)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default AddGood;
